import React, { useState } from 'react';
import { User, LogOut, Edit3, Save, X, Calendar, Building, Target, Users, Mail } from 'lucide-react';
import { useAuth } from './AuthContext';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    position: user?.position || '',
    businessName: user?.businessName || '',
    industry: user?.industry || '',
    companySize: user?.companySize || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      position: user?.position || '',
      businessName: user?.businessName || '',
      industry: user?.industry || '',
      companySize: user?.companySize || ''
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 
    'Manufacturing', 'Real Estate', 'Consulting', 'Marketing', 'Other'
  ];

  const companySizeOptions = [
    'Just me (1)', 'Small team (2-10)', 'Growing business (11-50)', 
    'Medium company (51-200)', 'Large enterprise (200+)'
  ];

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-300">{user.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full transition-colors duration-300"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4" />
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  />
                ) : (
                  <p className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl">{user.firstName}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4" />
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  />
                ) : (
                  <p className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl">{user.lastName}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <p className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl">{user.email}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </label>
                <p className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl">{formatDate(user.dateOfBirth)}</p>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Business Information</h3>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Target className="w-4 h-4" />
                  Position
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="position"
                    value={editData.position}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  />
                ) : (
                  <p className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl">{user.position}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Building className="w-4 h-4" />
                  Business Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="businessName"
                    value={editData.businessName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  />
                ) : (
                  <p className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl">{user.businessName}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Target className="w-4 h-4" />
                  Industry
                </label>
                {isEditing ? (
                  <select
                    name="industry"
                    value={editData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  >
                    {industryOptions.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl">{user.industry}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Users className="w-4 h-4" />
                  Company Size
                </label>
                {isEditing ? (
                  <select
                    name="companySize"
                    value={editData.companySize}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  >
                    {companySizeOptions.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl">{user.companySize}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;