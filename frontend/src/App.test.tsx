import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { getCatalogProducts } from './services/catalogService';
import App from './App';

function CurrentPath() {
  return <output data-testid="current-path">{useLocation().pathname}</output>;
}

test('renders the jewelry storefront home page', () => {
  expect(getCatalogProducts()).toHaveLength(5);

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /תכשיט שאוהבים לענוד כל יום/i })).toBeInTheDocument();
});

test('resolves product details at the canonical collection URL', () => {
  render(
    <MemoryRouter initialEntries={['/collection/product/lg-ring-001/clean-line-ring']}>
      <App />
      <CurrentPath />
    </MemoryRouter>
  );

  expect(screen.getByTestId('current-path')).toHaveTextContent('/collection/product/lg-ring-001/clean-line-ring');
  expect(screen.getByRole('heading', { name: 'טבעת קו נקי', level: 1 })).toBeInTheDocument();
  expect(screen.getByLabelText('מידת טבעת')).toBeInTheDocument();
  expect(screen.getByText('זמינות תאושר עם עדכון המלאי')).toBeInTheDocument();
});

test('redirects legacy product URLs to the canonical collection URL', () => {
  render(
    <MemoryRouter initialEntries={['/product/clean-line-ring']}>
      <App />
      <CurrentPath />
    </MemoryRouter>
  );

  expect(screen.getByTestId('current-path')).toHaveTextContent('/collection/product/lg-ring-001/clean-line-ring');
  expect(screen.getByRole('heading', { name: 'טבעת קו נקי', level: 1 })).toBeInTheDocument();
});

test('uses collection URLs for product links', () => {
  render(
    <MemoryRouter initialEntries={['/collection']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: /פרטים על טבעת קו נקי/i })).toHaveAttribute(
    'href',
    '/collection/product/lg-ring-001/clean-line-ring'
  );
});

test('supports keyboard access to the main content and descriptive product image text', () => {
  render(
    <MemoryRouter initialEntries={['/collection']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: 'דילוג לתוכן הראשי' })).toHaveAttribute('href', '#main-content');
  expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
  expect(screen.getByRole('img', { name: 'טבעת קו נקי' })).toBeInTheDocument();
});


test('confirms when a product is added to the cart', () => {
  render(
    <MemoryRouter initialEntries={['/collection']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: 'הוספת טבעת קו נקי לסל' }));

  expect(screen.getByRole('status')).toHaveTextContent('טבעת קו נקי נוסף לסל');
});

test('confirms when a product is removed from the cart', () => {
  localStorage.setItem('levi-gold-cart', JSON.stringify([{ productId: 'lg-ring-001', quantity: 1 }]));

  render(
    <MemoryRouter initialEntries={['/cart']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: 'הסרה' }));

  expect(screen.getByRole('status')).toHaveTextContent('טבעת קו נקי הוסר מהעגלה');
  expect(screen.getByText('הסל שלך עוד מחכה לפריט הראשון.')).toBeInTheDocument();
});

test('takes the empty cart collection link to all jewelry', () => {
  localStorage.clear();
  const scrollTo = jest.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

  render(
    <MemoryRouter initialEntries={['/cart']}>
      <App />
    </MemoryRouter>
  );

  scrollTo.mockClear();
  fireEvent.click(screen.getByRole('link', { name: /לגלות את הקולקציה/i }));

  expect(screen.getByRole('heading', { name: 'הקולקציה שלנו', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'הכל' })).toHaveClass('current');
  expect(scrollTo).toHaveBeenCalledWith(0, 0);
  scrollTo.mockRestore();
});

test('opens accessibility options and applies selected display settings', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: 'פתיחת תפריט נגישות' }));
  expect(screen.getByRole('region', { name: 'אפשרויות נגישות' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'הגדלת תצוגה' }));
  fireEvent.click(screen.getByRole('button', { name: 'ניגודיות גבוהה' }));
  fireEvent.click(screen.getByRole('button', { name: 'גופן קריא' }));

  expect(document.querySelector('.storefront')).toHaveClass('accessibility-scale-110', 'accessibility-high-contrast', 'accessibility-readable-font');

  fireEvent.click(screen.getByRole('button', { name: 'שחזור ברירות מחדל' }));
  expect(document.querySelector('.storefront')).not.toHaveClass('accessibility-scale-110', 'accessibility-high-contrast', 'accessibility-readable-font');
});

test('moves keyboard focus from the accessibility trigger into its options', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const trigger = screen.getByRole('button', { name: 'פתיחת תפריט נגישות' });
  trigger.focus();
  fireEvent.click(trigger);
  userEvent.tab();

  const panel = screen.getByRole('region', { name: 'אפשרויות נגישות' });
  expect(within(panel).getByRole('button', { name: 'סגירת תפריט נגישות' })).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(trigger).toHaveFocus();
});
