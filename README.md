# Dabang Dashboard

A modern, responsive React dashboard that replicates the design from the provided image. This dashboard includes various data visualization components and a clean, professional UI.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with rounded corners and subtle shadows
- **Interactive Charts**: Built with Recharts library for smooth data visualization
- **Sidebar Navigation**: Collapsible sidebar with navigation menu
- **Search Functionality**: Header search bar for easy navigation
- **User Profile**: User information display with avatar
- **Multiple Chart Types**: Line charts, bar charts, and progress bars

## Components

### Layout Components
- **Sidebar**: Navigation menu with Dabang branding and Pro upgrade card
- **Header**: Search bar, language selector, and user profile
- **Dashboard**: Main content area with responsive grid layout

### Data Visualization Components
- **Today's Sales**: Summary cards with sales metrics and export functionality
- **Visitor Insights**: Line chart showing customer trends over time
- **Total Revenue**: Bar chart comparing online vs offline sales
- **Customer Satisfaction**: Line chart comparing monthly satisfaction scores
- **Target vs Reality**: Bar chart showing sales targets vs actual performance
- **Top Products**: Product list with progress bars showing sales percentages
- **Sales Mapping**: World map visualization with country-wise sales data
- **Volume vs Service Level**: Bar chart comparing volume and service metrics

## Technologies Used

- **React 18**: Modern React with hooks
- **Recharts**: Chart library for data visualization
- **React Icons**: Icon library for UI elements
- **CSS3**: Custom styling with modern CSS features
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## Installation

1. Clone the repository or download the files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js & Sidebar.css
│   ├── Header.js & Header.css
│   ├── Dashboard.js & Dashboard.css
│   ├── TodaysSales.js & TodaysSales.css
│   ├── VisitorInsights.js & VisitorInsights.css
│   ├── TotalRevenue.js & TotalRevenue.css
│   ├── CustomerSatisfaction.js & CustomerSatisfaction.css
│   ├── TargetVsReality.js & TargetVsReality.css
│   ├── TopProducts.js & TopProducts.css
│   ├── SalesMapping.js & SalesMapping.css
│   └── VolumeVsService.js & VolumeVsService.css
├── App.js & App.css
├── index.js & index.css
└── package.json
```

## Customization

The dashboard is highly customizable:

- **Colors**: Modify CSS custom properties or color values in component styles
- **Data**: Update chart data in component files
- **Layout**: Adjust grid layouts in Dashboard.css
- **Charts**: Customize chart configurations in Recharts components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
