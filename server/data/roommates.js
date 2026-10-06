/**
 * roommates.js – Sample Roommate Profile Data
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * 15 realistic student roommate profiles.
 * Profiles are deliberately varied across ALL preference fields
 * so that the matching algorithm produces meaningfully different scores.
 *
 * Preferences spread:
 *   Locations: Whitefield, Marathahalli, Electronic City, HSR Layout,
 *              BTM Layout, Rajajinagar, RR Nagar, Yelahanka
 *   Budgets:   Below ₹5,000 | ₹5,000–₹10,000 | ₹10,000–₹15,000
 *   Sharing:   Single | 2 Sharing | 3 Sharing
 *   Food:      Veg | Non-Veg | Both
 *   Smoking:   Yes | No
 */

const roommates = [
  {
    id: 1,
    name: "Arjun Sharma",
    age: 21,
    college: "RV University",
    preferredLocation: "Rajajinagar",
    budget: "₹5,000–₹10,000",
    sharingPreference: "2 Sharing",
    foodPreference: "Veg",
    smokingPreference: "No",
    introduction:
      "Hey! I'm a 3rd year CS student at RV University. I like to keep things tidy and love coding in my free time. Looking for a like-minded roommate who respects study hours.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Priya Nair",
    age: 20,
    college: "Christ University",
    preferredLocation: "Whitefield",
    budget: "₹10,000–₹15,000",
    sharingPreference: "Single",
    foodPreference: "Both",
    smokingPreference: "No",
    introduction:
      "2nd year MBA student at Christ University. I enjoy cooking and Netflix. Looking for a quiet, independent space with good WiFi. Work from home on weekends.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Rohan Verma",
    age: 22,
    college: "PES University",
    preferredLocation: "Electronic City",
    budget: "Below ₹5,000",
    sharingPreference: "3 Sharing",
    foodPreference: "Non-Veg",
    smokingPreference: "No",
    introduction:
      "Final year ECE student. Budget-conscious and looking for others to split the rent. Love cricket and gaming. Easy-going and fun to live with!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Sneha Patel",
    age: 21,
    college: "Jain University",
    preferredLocation: "Marathahalli",
    budget: "₹5,000–₹10,000",
    sharingPreference: "2 Sharing",
    foodPreference: "Veg",
    smokingPreference: "No",
    introduction:
      "3rd year Commerce student at Jain University. Strictly veg, non-smoker. Love fitness – going to gym daily. Looking for a clean and disciplined roommate.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Karthik Reddy",
    age: 23,
    college: "BMS College of Engineering",
    preferredLocation: "HSR Layout",
    budget: "₹10,000–₹15,000",
    sharingPreference: "Single",
    foodPreference: "Non-Veg",
    smokingPreference: "No",
    introduction:
      "Final year Mechanical Engineering student. Internship during weekdays. Need a peaceful flat near HSR Layout. No parties, just serious study time.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Ananya Singh",
    age: 20,
    college: "RV University",
    preferredLocation: "BTM Layout",
    budget: "Below ₹5,000",
    sharingPreference: "3 Sharing",
    foodPreference: "Veg",
    smokingPreference: "No",
    introduction:
      "2nd year BSc student. Strictly veg. Looking for girls-only accommodation in BTM Layout near college. Friendly and easy-going. Love music and cooking.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "Vikram Nandakumar",
    age: 22,
    college: "Christ University",
    preferredLocation: "Whitefield",
    budget: "₹10,000–₹15,000",
    sharingPreference: "2 Sharing",
    foodPreference: "Both",
    smokingPreference: "Yes",
    introduction:
      "MBA student at Christ. Open to sharing with another person. Neat and hygienic. Work late nights sometimes. Prefer someone with a similar lifestyle.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Lakshmi Venkatesh",
    age: 21,
    college: "PES University",
    preferredLocation: "Electronic City",
    budget: "₹5,000–₹10,000",
    sharingPreference: "2 Sharing",
    foodPreference: "Veg",
    smokingPreference: "No",
    introduction:
      "3rd year IT student. Looking for a calm roommate who maintains cleanliness. Into yoga and meditation. Prefer someone who sleeps early.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "Aditya Kulkarni",
    age: 20,
    college: "Jain University",
    preferredLocation: "Marathahalli",
    budget: "Below ₹5,000",
    sharingPreference: "3 Sharing",
    foodPreference: "Both",
    smokingPreference: "No",
    introduction:
      "1st year BCA student. New to Bengaluru. Looking for a place with other students where I can feel comfortable. Friendly, polite and responsible.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    name: "Meghana Krishnan",
    age: 22,
    college: "BMS College of Engineering",
    preferredLocation: "Rajajinagar",
    budget: "₹5,000–₹10,000",
    sharingPreference: "2 Sharing",
    foodPreference: "Veg",
    smokingPreference: "No",
    introduction:
      "Final year Civil Engineering student at BMS. Need a quiet place for the last year. Into reading and sketching. Looking for a dedicated co-inhabitant.",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: 11,
    name: "Harish Babu",
    age: 21,
    college: "RV University",
    preferredLocation: "RR Nagar",
    budget: "Below ₹5,000",
    sharingPreference: "3 Sharing",
    foodPreference: "Non-Veg",
    smokingPreference: "Yes",
    introduction:
      "2nd year Mechanical student at RV University. Looking for a budget hostel in RR Nagar. Easy-going person, loves watching football and cooking.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 12,
    name: "Divya Ramachandran",
    age: 20,
    college: "Christ University",
    preferredLocation: "Yelahanka",
    budget: "₹5,000–₹10,000",
    sharingPreference: "2 Sharing",
    foodPreference: "Veg",
    smokingPreference: "No",
    introduction:
      "BA English student at Christ University. Bookworm and classical dancer. Looking for a calm, veg, non-smoking female roommate near Yelahanka.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 13,
    name: "Siddharth Joshi",
    age: 23,
    college: "PES University",
    preferredLocation: "HSR Layout",
    budget: "₹10,000–₹15,000",
    sharingPreference: "Single",
    foodPreference: "Both",
    smokingPreference: "No",
    introduction:
      "Final year CS student at PES doing an internship in HSR Layout. Want a single private space. Non-smoker. Prefer minimal interaction – just a clean shared space.",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 14,
    name: "Pooja Hegde",
    age: 19,
    college: "Jain University",
    preferredLocation: "Electronic City",
    budget: "Below ₹5,000",
    sharingPreference: "3 Sharing",
    foodPreference: "Veg",
    smokingPreference: "No",
    introduction:
      "1st year BBA student at Jain University. New to the city, looking for friendly roommates in Electronic City. Very organized and punctual. Strictly veg.",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    id: 15,
    name: "Rahul Desai",
    age: 22,
    college: "BMS College of Engineering",
    preferredLocation: "Marathahalli",
    budget: "₹5,000–₹10,000",
    sharingPreference: "2 Sharing",
    foodPreference: "Non-Veg",
    smokingPreference: "No",
    introduction:
      "3rd year EEE student at BMS. Love travelling and trekking. Looking for a roommate in Marathahalli who is outgoing and doesn't mind weekend trips.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

module.exports = roommates;
