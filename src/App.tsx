import React, { useState } from 'react';
import { Home, BookOpen, Library, Github, Twitter, Mail, MapPin, Users, Phone, Globe2 } from 'lucide-react';
import ClimateAIDashboard from './components/ClimateAIDashboard';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-green-700">ClimateAI Predictor</h1>
              <div className="flex space-x-2">
                <NavItem
                  icon={Home}
                  label="Dashboard"
                  active={activeSection === 'dashboard'}
                  onClick={() => setActiveSection('dashboard')}
                />
                <NavItem
                  icon={BookOpen}
                  label="About"
                  active={activeSection === 'about'}
                  onClick={() => setActiveSection('about')}
                />
                <NavItem
                  icon={Library}
                  label="Resources"
                  active={activeSection === 'resources'}
                  onClick={() => setActiveSection('resources')}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'dashboard' && <ClimateAIDashboard />}
        {activeSection === 'about' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">About ClimateAI Predictor</h2>
            <p className="text-gray-600 mb-6">
              ClimateAI Predictor leverages advanced artificial intelligence to provide accurate climate change predictions
              and insights. Our platform combines historical data, satellite imagery, and machine learning models to help
              understand and prepare for climate-related challenges.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
                  alt="Nature landscape"
                  className="rounded-lg object-cover w-full h-64"
                />
                <p className="text-sm text-gray-600">
                  Our AI models analyze vast amounts of environmental data to predict future climate patterns and their impact on ecosystems.
                </p>
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="Climate impact"
                  className="rounded-lg object-cover w-full h-64"
                />
                <p className="text-sm text-gray-600">
                  We use advanced machine learning algorithms to predict and visualize potential climate change impacts across different regions.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'resources' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Climate Resources</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Research Papers</h3>
                <p className="text-gray-600">Access the latest climate research and AI prediction methodologies.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Data Sources</h3>
                <p className="text-gray-600">Explore our comprehensive collection of climate data sources.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">API Documentation</h3>
                <p className="text-gray-600">Learn how to integrate our climate predictions into your applications.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About ClimateAI</h3>
              <p className="text-gray-600 text-sm">
                Leading the way in AI-powered climate prediction and analysis, helping organizations prepare for and adapt to climate change.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Globe2 className="w-4 h-4" />
                  <a href="#" className="hover:text-green-700">Global Impact</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <a href="#" className="hover:text-green-700">Our Team</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Library className="w-4 h-4" />
                  <a href="#" className="hover:text-green-700">Resources</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Climate Street, Earth</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:contact@climateai.com" className="hover:text-green-700">contact@climateai.com</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com/climateai" className="text-gray-600 hover:text-green-700 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://github.com/climateai" className="text-gray-600 hover:text-green-700 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="mailto:contact@climateai.com" className="text-gray-600 hover:text-green-700 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Subscribe to our newsletter for the latest climate insights and predictions.
              </p>
              <form className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© 2025 ClimateAI Predictor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;