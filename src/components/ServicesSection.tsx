import React, { useEffect, useState } from 'react';
import { Target, TrendingUp, Zap } from 'lucide-react';
import { client } from '../lib/sanity';
import { servicesQuery } from '../lib/queries';
import { Service } from '../types/service';

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback static services (your original content)
  const fallbackServices: Service[] = [
    {
      _id: 'fallback-1',
      title: 'Marketing Strategy',
      short_description: 'Marketing ICP = people to attract and nurture before the sale',
      icon: '🎯',
      points: [
        'Focus on strategy and positioning',
        'Define the Marketing ICP (the audience your brand content should attract)',
        'Content direction + messaging clarity',
        'Manage all production: photoshoots, graphic design, video editing',
        'Design and launch complete marketing campaigns'
      ]
    },
    {
      _id: 'fallback-2',
      title: 'Sales Strategy',
      short_description: 'Sales ICP = qualified buyers actively making decisions',
      icon: '📈',
      points: [
        'Define the Sales ICP (ready-to-buy segment)',
        'Build full CRM & sales systems using tools like HubSpot',
        'Set up automated chatbots to increase closing chances',
        'Design sales campaigns and outreach sequences',
        'Optimize each touchpoint to turn leads into revenue'
      ]
    },
    {
      _id: 'fallback-3',
      title: 'Growth Acceleration',
      short_description: '',
      icon: '⚡',
      points: [
        'Consulting-style service: 1-on-1 strategic clarity',
        'Identify and resolve growth bottlenecks',
        'Plan scale pathways and streamline decision-making',
        'Available as a free trial: strategic insight delivered in 24 hours',
        'Acts as your entry-point offer to build trust'
      ]
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await client.fetch<Service[]>(servicesQuery);
        
        if (data && data.length > 0) {
          setServices(data);
        } else {
          // Use fallback if no services found
          setServices(fallbackServices);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        // Use fallback on error
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Helper function to get the appropriate icon component
  const getIconComponent = (iconString: string, index: number) => {
    // If it's an emoji, return it directly
    if (iconString && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(iconString)) {
      return <span className="text-2xl">{iconString}</span>;
    }
    
    // Fallback to original icons based on index
    const fallbackIcons = [Target, TrendingUp, Zap];
    const IconComponent = fallbackIcons[index % fallbackIcons.length];
    return <IconComponent className="w-8 h-8 text-white" />;
  };

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            What I Offer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            No buzzwords. Just tailored solutions to help you attract the right audience, close more deals, and unlock new levels of growth.
          </p>
        </div>

        <div className={`grid md:grid-cols-3 gap-8 ${loading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
          {services.map((service, index) => (
            <div 
              key={service._id} 
              className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                {getIconComponent(service.icon, index)}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              
              <ul className="text-gray-300 leading-relaxed space-y-3">
                {service.points?.map((point, pointIndex) => (
                  <li key={pointIndex}>• {point}</li>
                ))}
              </ul>
              
              {service.short_description && (
                <p className="text-sm text-gray-400 mt-4 italic">
                  {service.short_description}
                </p>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="text-center mt-8">
            <p className="text-red-400 text-sm">
              Using fallback content. {error}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;