import React, { useState, useEffect } from 'react';
import { getAllCustomers, getCustomersByDate, addCustomer } from '../../../services/customerService';
import { CustomerType } from '../../../types/customersType';
import './BarberShopReservation.css';

const getDateString = (date: Date) => date.toISOString().split('T')[0];

function generateTimeSlots(startHour = 8, endHour = 18) {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  slots.push(`${endHour.toString().padStart(2, '0')}:00`);
  return slots;
}

const WeeklyReservation: React.FC = () => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const [selectedDate, setSelectedDate] = useState(getDateString(today));
  const [selectedTime, setSelectedTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [busySlots, setBusySlots] = useState<string[]>([]);

  // Business hours per weekday (JS getDay: 0=Sun,1=Mon,...5=Fri,6=Sat)
  // null means closed
  const businessHours: Record<number, { start: number; end: number } | null> = {
    0: { start: 8, end: 18 }, // Sunday
    1: { start: 8, end: 18 }, // Monday
    2: { start: 8, end: 18 }, // Tuesday
    3: { start: 8, end: 18 }, // Wednesday
    4: { start: 8, end: 18 }, // Thursday
    5: { start: 8, end: 13 }, // Friday - shorter day
    6: null, // Saturday - closed
  };

  const getAllowedSlotsForDate = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    const day = d.getDay();
    const hours = businessHours[day];
    if (!hours) return [];
    return generateTimeSlots(hours.start, hours.end);
  };

  const allowedSlots = getAllowedSlotsForDate(selectedDate);
  const allowedSet = new Set(allowedSlots);
  const isClosed = allowedSlots.length === 0;

  // Show all time slots (8-18) for consistency, but disable unavailable ones
  const timeSlots = generateTimeSlots();

  // ✅ שליפת תורים מאושרים מהשרת וסינון לפי תאריך נבחר
  useEffect(() => {
    const fetchBusySlots = async () => {
      // Reset busy slots when date changes to prevent stale data
      setBusySlots([]);
      
      try {
        const isoDate = selectedDate; // YYYY-MM-DD
        const customers = await getCustomersByDate(isoDate);

        // ממיר את selectedDate מ־YYYY-MM-DD ל־DD.MM.YYYY
        const [year, month, day] = selectedDate.split("-");
        const formattedDate = `${day}.${month}.${year}`;

        // סינון לפי תאריך מתוך המחרוזת queue שמגיעה מהשרת
        // the backend returns customers for the requested date already
        const times = customers.map((c: CustomerType) => {
          const [, timePart] = (c.queue as unknown as string).split(', ');
          return timePart.trim();
        });

        setBusySlots(times);
      } catch (err) {
        console.error("Error fetching busy slots:", err);
        setBusySlots([]); // Ensure empty on error
      }
    };

    fetchBusySlots();
  }, [selectedDate]);

  // אם המשתמש בחר שעה שאינה מותרת לאחר שינוי תאריך - ננקה אותה
  useEffect(() => {
    if (!selectedTime) return;
    const currentAllowedSlots = getAllowedSlotsForDate(selectedDate);
    const currentAllowedSet = new Set(currentAllowedSlots);
    const stillAllowed = currentAllowedSet.has(selectedTime) && !busySlots.includes(selectedTime);
    if (!stillAllowed) setSelectedTime('');
  }, [selectedDate, busySlots, selectedTime]);

  // ✅ שליחת תור חדש לשרת
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${day}.${month}.${year}, ${selectedTime}`;

    // Build an ISO 8601 datetime string to match backend Joi.date().iso() validation
    const [hourStr, minuteStr] = selectedTime.split(":");
    const yearN = Number(year);
    const monthN = Number(month) - 1; // JS months are 0-based
    const dayN = Number(day);
    const hourN = Number(hourStr || 0);
    const minuteN = Number(minuteStr || 0);
    const isoString = new Date(yearN, monthN, dayN, hourN, minuteN).toISOString();

    const newCustomer: CustomerType = {
      firstName,
      lastName,
      phoneNumber: phone,
      queue: isoString as unknown as Date,
    };

    try {
      await addCustomer(newCustomer);
      setMessage(`הזמנה עבור ${firstName} ${lastName} בתאריך ${formattedDate} התקבלה!`);
      setSelectedTime('');
    } catch (error: any) {
      // 👇 טיפול נכון בשגיאות שמגיעות מהשרת
      const serverError = error.response?.data?.message || "שגיאה בשליחת ההזמנה";
      console.error("Error submitting reservation:", error);
      setMessage(serverError);
    }
  };

  return (
    <div className="reservation-page" dir="rtl">
      <div className="reservation-card">
        <div className="reservation-header">
          <p className="reservation-eyebrow">תיאום תור אונליין</p>
          <h3 className="reservation-title">קבע תור במספר צעדים פשוטים</h3>
          <p className="reservation-subtitle">בחר תאריך, שעה ופרטים אישיים ונחזור אליך באישור מהיר</p>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="reservation-section">

          {/* פרטים אישיים */}
          <div className="reservation-inputs">
            <input
              className="reservation-input"
              dir="rtl"
              placeholder="שם פרטי"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <input
              className="reservation-input"
              dir="rtl"
              placeholder="שם משפחה"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
            <input
              className="reservation-input"
              dir="rtl"
              placeholder="מספר פלאפון"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>
          </div>

          {/* בחירת תאריך ושעה */}
          <div className="reservation-section">
            <label className="reservation-label">בחר תאריך (עד שבוע קדימה)</label>
            <input
              className="reservation-input"
              type="date"
              min={getDateString(today)}
              max={getDateString(maxDate)}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              required
            />

            <label className="reservation-label">בחר שעה:</label>
            <div className="reservation-slots">
                {timeSlots.map(slot => {
                  const isBusy = busySlots.includes(slot);
                  const isAllowed = allowedSet.has(slot);
                  const disabled = isBusy || !isAllowed;
                  const baseClass = selectedTime === slot ? 'reservation-slot reservation-slot-selected' : 'reservation-slot';
                  const disabledClass = !isAllowed
                    ? 'reservation-slot-disabled'
                    : isBusy
                      ? 'reservation-slot-busy'
                      : '';

                  return (
                    <button
                      key={slot}
                      type="button"
                      className={`${baseClass} ${disabledClass}`}
                      disabled={disabled}
                      onClick={() => {
                        if (disabled) return;
                        setSelectedTime(slot);
                      }}
                      title={!isAllowed ? 'לא ניתן לקבוע תור בזמן זה' : isBusy ? 'זמן תפוס' : ''}
                    >
                      {slot}
                    </button>
                  );
                })}
            </div>

            {isClosed && (
              <div className="reservation-note">לא ניתן לקבוע תורים ביום זה</div>
            )}
          </div>

        {/* הודעה לאחר שליחה */}
        {message && <p className="reservation-message">{message}</p>}

        {/* כפתור שליחה */}
        <div className="reservation-submit-wrap">
          <button
            className="reservation-submit"
            type="submit"
            disabled={!selectedTime}
          >
            הזמן תור
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default WeeklyReservation;
