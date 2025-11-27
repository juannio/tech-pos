import type { ProductOptionsConfig } from '../interfaces';
import type { Product } from '../stores/cartStore';

// Define which products have which options
export const productOptionsConfig: ProductOptionsConfig = {
  espresso: [
    {
      id: 'shots',
      label: 'Number of Shots',
      type: 'number',
      defaultValue: 1,
      required: false,
    },
    {
      id: 'size',
      label: 'Size',
      type: 'radio',
      options: ['Single', 'Double'],
      required: true,
    },
  ],
  cappuccino: [
    {
      id: 'milk',
      label: 'Milk Type',
      type: 'radio',
      options: [
        'Whole Milk',
        'Skim Milk',
        'Oat Milk',
        'Almond Milk',
        'Soy Milk',
      ],
      required: true,
    },
    {
      id: 'shots',
      label: 'Number of Shots',
      type: 'number',
      defaultValue: 1,
      required: false,
    },
    {
      id: 'foam',
      label: 'Foam Level',
      type: 'radio',
      options: ['Light', 'Normal', 'Extra'],
      required: false,
    },
  ],
  'iced-latte': [
    {
      id: 'milk',
      label: 'Milk Type',
      type: 'radio',
      options: [
        'Whole Milk',
        'Skim Milk',
        'Oat Milk',
        'Almond Milk',
        'Soy Milk',
      ],
      required: true,
    },
    {
      id: 'shots',
      label: 'Number of Shots',
      type: 'number',
      defaultValue: 1,
      required: false,
    },
    {
      id: 'sweetener',
      label: 'Sweetener',
      type: 'select',
      options: [
        'None',
        'Sugar',
        'Honey',
        'Stevia',
        'Vanilla Syrup',
        'Caramel Syrup',
      ],
      required: false,
    },
  ],
};

export const products: Product[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'Hot Beverages',
    price: '$3.50',
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Hot Beverages',
    price: '$4.50',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
  },
  {
    id: 'croissant',
    name: 'Croissant',
    category: 'Bakery',
    price: '$3.00',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
  },
  {
    id: 'blueberry-muffin',
    name: 'Blueberry Muffin',
    category: 'Bakery',
    price: '$2.75',
    image:
      'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop',
  },
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    category: 'Food',
    price: '$8.50',
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=400&fit=crop',
  },
  {
    id: 'club-sandwich',
    name: 'Club Sandwich',
    category: 'Food',
    price: '$9.00',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop',
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    category: 'Cold Beverages',
    price: '$4.75',
    image:
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop',
  },
  {
    id: 'smoothie-bowl',
    name: 'Smoothie Bowl',
    category: 'Healthy',
    price: '$7.50',
    image:
      'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop',
  },
];
