import { create } from 'twrnc';

// Import your custom Tailwind config
import tailwindConfig from './tailwind.config';

// Create a Tailwind instance with the custom config
const tw = create(tailwindConfig);

export default tw;
