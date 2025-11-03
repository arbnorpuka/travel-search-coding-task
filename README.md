# Travel Search - Coding Task

### Task description
Create a React, TypeScript application for searching travel destinations. Users should be able to search for destinations and view details about them. Implement an algorithm to suggest nearby destinations based on the selected destination.

## Technology Choices

### **Core Framework**
- **React 18.3**
- **TypeScript**
- **Vite**

### **Styling**
- **Tailwind CSS**
- Responsive design with mobile-first approach

### **UI Components**
- **Heroicons**
- **Headless UI** - the combobox

### **Data Management**
- **React Query**
- **Lodash**

### **Routing**
- **React Router DOM**

### **Development Tools**
- **ESLint**
- **TypeScript Strict Mode**

## Design Decisions

### **Project Structure**
```
src/
├── api/           # Fake API functions and data models
├── components/    # Reusable UI components
├── data/          # Destinations
├── pages/         # Page-level components
└── types/         # TypeScript type definitions
```

### **Architecture**
1. **Component-based** - Modular, reusable components
2. **Type-safe** - Full TypeScript coverage with strict mode
3. **Accessible** - Keyboard navigation and ARIA support via Headless UI
4. **User-centric** - Loading states, error handling, and smooth UX
5. **Performance** - Efficient rendering and data fetching

### **API**
- Asynchronous fake API with simulated network delays (500ms)
- Error simulation for testing error handling
- Console logging of all API arguments for debugging

### **Search Implementation**
- **Debounced Input** (300ms) - Reduces API calls during typing
- **Client-side Caching** - React Query caches destination details
- **Loading States** - Visual feedback during data fetching
- **Error Handling** - User-friendly error messages
- **Keyboard Navigation** - Fully accessible combobox with arrow keys and Enter

### **Nearby Destinations Algorithm**
- **Haversine Formula** - Calculates distances between geographic coordinates
- Returns top 5 nearest destinations sorted by distance

### **Deep Linking**
- URL-based navigation to specific destinations (`/:id`)

### **Accessibility**
- **ARIA Attributes** - Proper roles and labels
- **Keyboard Navigation** - Arrow keys, Enter, Escape
- **Focus Management** - Clear focus indicators

### **User Experience Enhancements**
- Loading spinner during searches
- "No results found" message when appropriate
- Error alerts with clear messaging
- Smooth transitions and hover states

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arbnorpuka/travel-search-coding-task
cd travel-search-coding-task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Testing Error Handling

To test the error handling feature, type `"fail"` in the search box. This will trigger a simulated backend error and display an error message below the combobox.

## License

This project is part of a coding task.