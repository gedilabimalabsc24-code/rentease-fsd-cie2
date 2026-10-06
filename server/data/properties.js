/**
 * properties.js – Sample Property Data
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * 15 realistic rental properties across Bengaluru.
 * Properties are spread across all 5 colleges and all 8 locations
 * so that search, college filter, and type filter all produce real results.
 */

const properties = [
  {
    id: 1,
    name: "Cozy Studio near RV University",
    location: "Rajajinagar, Bengaluru",
    rent: 7500,
    type: "Studio",
    rooms: 1,
    description:
      "A well-furnished studio apartment perfect for college students. Close to RV University with easy access to public transport. Includes all basic amenities in a safe, student-friendly locality.",
    amenities: ["WiFi", "AC", "Washing Machine", "24hr Water", "Security"],
    nearbyCollege: "RV University",
    distanceFromCollege: "1.2 km",
    ownerName: "Ramesh Gowda",
    contact: "+91-9876543210",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Spacious 2BHK in Whitefield",
    location: "Whitefield, Bengaluru",
    rent: 14000,
    type: "2BHK",
    rooms: 2,
    description:
      "Modern 2BHK apartment ideal for students who prefer sharing. Located in Whitefield with easy connectivity to Christ University. Fully furnished with a well-equipped kitchen.",
    amenities: ["WiFi", "Gym", "Parking", "Power Backup", "Security", "Lift"],
    nearbyCollege: "Christ University",
    distanceFromCollege: "2.5 km",
    ownerName: "Priya Shetty",
    contact: "+91-9845671234",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "PG for Girls near PES University",
    location: "Electronic City, Bengaluru",
    rent: 6000,
    type: "PG",
    rooms: 1,
    description:
      "Safe and comfortable PG accommodation for girl students. Meals included. Located just 1 km from PES University. Homely atmosphere with strict security.",
    amenities: ["WiFi", "Meals", "Housekeeping", "Security", "TV", "Hot Water"],
    nearbyCollege: "PES University",
    distanceFromCollege: "1.0 km",
    ownerName: "Kavitha Rao",
    contact: "+91-9741236548",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Shared Apartment in Marathahalli",
    location: "Marathahalli, Bengaluru",
    rent: 8500,
    type: "Shared Apartment",
    rooms: 3,
    description:
      "3-sharing fully furnished apartment in prime Marathahalli location. Walking distance from Jain University. Common kitchen, dining and living space available.",
    amenities: ["WiFi", "Kitchen", "TV", "Parking", "Power Backup"],
    nearbyCollege: "Jain University",
    distanceFromCollege: "0.8 km",
    ownerName: "Suresh Kumar",
    contact: "+91-9632587410",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Premium 1BHK in HSR Layout",
    location: "HSR Layout, Bengaluru",
    rent: 12000,
    type: "1BHK",
    rooms: 1,
    description:
      "Newly built premium 1BHK apartment in HSR Layout. Perfect for working students. Close to BMS College of Engineering with metro connectivity. Modern interiors with high-speed WiFi.",
    amenities: ["WiFi", "AC", "Gym", "Security", "Power Backup", "Lift"],
    nearbyCollege: "BMS College of Engineering",
    distanceFromCollege: "1.8 km",
    ownerName: "Anand Murthy",
    contact: "+91-9087654321",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Budget PG in BTM Layout",
    location: "BTM Layout, Bengaluru",
    rent: 4500,
    type: "PG",
    rooms: 1,
    description:
      "Affordable PG accommodation for students on a budget. Clean and safe environment near RV University. Good connectivity via BMTC buses. Veg meals available.",
    amenities: ["WiFi", "Meals", "Housekeeping", "Security"],
    nearbyCollege: "RV University",
    distanceFromCollege: "3.0 km",
    ownerName: "Meena Iyer",
    contact: "+91-9567834120",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Modern 3BHK near Christ University",
    location: "Yelahanka, Bengaluru",
    rent: 18000,
    type: "3BHK",
    rooms: 3,
    description:
      "Spacious 3BHK suitable for a group of 3 students. Fully furnished with modular kitchen. In a gated community near Christ University with all modern amenities.",
    amenities: ["WiFi", "AC", "Gym", "Swimming Pool", "Security", "Parking", "Lift"],
    nearbyCollege: "Christ University",
    distanceFromCollege: "4.2 km",
    ownerName: "Vijay Shankar",
    contact: "+91-9876012345",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Boys Hostel near Jain University",
    location: "RR Nagar, Bengaluru",
    rent: 5000,
    type: "Hostel",
    rooms: 1,
    description:
      "Well-maintained boys hostel with all facilities. 2-sharing and 3-sharing rooms available. Located 1.5 km from Jain University. Study rooms and canteen available.",
    amenities: ["WiFi", "Canteen", "Study Room", "Laundry", "Security", "Sports Area"],
    nearbyCollege: "Jain University",
    distanceFromCollege: "1.5 km",
    ownerName: "Ravi Prakash",
    contact: "+91-9234567890",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Furnished Room near BMS College",
    location: "Rajajinagar, Bengaluru",
    rent: 9000,
    type: "1BHK",
    rooms: 1,
    description:
      "Nicely furnished single room with attached bathroom in Rajajinagar. Very close to BMS College of Engineering. Ideal for a single student who values privacy.",
    amenities: ["WiFi", "AC", "Attached Bathroom", "Hot Water", "Power Backup"],
    nearbyCollege: "BMS College of Engineering",
    distanceFromCollege: "0.5 km",
    ownerName: "Deepa Nair",
    contact: "+91-9845098765",
    image:
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
  },
  {
    id: 10,
    name: "2-Sharing PG near PES University",
    location: "Electronic City, Bengaluru",
    rent: 7000,
    type: "PG",
    rooms: 1,
    description:
      "Clean and comfortable 2-sharing PG near PES University. All meals included. Separate study area available. Just 5 minutes walk to campus.",
    amenities: ["WiFi", "Meals", "Housekeeping", "AC", "Security", "TV"],
    nearbyCollege: "PES University",
    distanceFromCollege: "0.5 km",
    ownerName: "Shashi Kumar",
    contact: "+91-9870123456",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=400&fit=crop",
  },
  {
    id: 11,
    name: "Affordable Studio in Marathahalli",
    location: "Marathahalli, Bengaluru",
    rent: 6500,
    type: "Studio",
    rooms: 1,
    description:
      "Compact and affordable studio apartment in Marathahalli. Ideal for students at Christ University. Close to metro station and shopping areas. Fully furnished.",
    amenities: ["WiFi", "AC", "Hot Water", "Security", "Power Backup"],
    nearbyCollege: "Christ University",
    distanceFromCollege: "1.5 km",
    ownerName: "Lakshmi Bai",
    contact: "+91-9900112233",
    image:
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&h=400&fit=crop",
  },
  {
    id: 12,
    name: "Girls PG in Yelahanka",
    location: "Yelahanka, Bengaluru",
    rent: 5500,
    type: "PG",
    rooms: 1,
    description:
      "Safe and secure girls-only PG in Yelahanka. Strictly vegetarian meals provided. Walking distance from RV University extension campus. CCTV surveillance 24/7.",
    amenities: ["WiFi", "Meals", "Security", "CCTV", "Hot Water", "Housekeeping"],
    nearbyCollege: "RV University",
    distanceFromCollege: "2.0 km",
    ownerName: "Saroja Devi",
    contact: "+91-9988776655",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&h=400&fit=crop",
  },
  {
    id: 13,
    name: "3-Sharing Flat near BMS College",
    location: "HSR Layout, Bengaluru",
    rent: 10500,
    type: "Shared Apartment",
    rooms: 3,
    description:
      "Large 3BHK used as a 3-sharing flat near BMS College of Engineering. Each student gets their own room. Shared kitchen and living area. Very clean and well maintained.",
    amenities: ["WiFi", "AC", "Washing Machine", "Kitchen", "Security", "Parking"],
    nearbyCollege: "BMS College of Engineering",
    distanceFromCollege: "2.2 km",
    ownerName: "Mohan Raj",
    contact: "+91-9123456789",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    id: 14,
    name: "Budget Hostel in Electronic City",
    location: "Electronic City, Bengaluru",
    rent: 4000,
    type: "Hostel",
    rooms: 1,
    description:
      "Budget-friendly hostel for students near Jain University. 4-sharing dormitory style. All meals included. Ideal for first-year students new to Bengaluru.",
    amenities: ["WiFi", "Meals", "Laundry", "Study Room", "Security"],
    nearbyCollege: "Jain University",
    distanceFromCollege: "3.5 km",
    ownerName: "Nagesh Babu",
    contact: "+91-9654321098",
    image:
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&h=400&fit=crop",
  },
  {
    id: 15,
    name: "Luxury 2BHK in Whitefield",
    location: "Whitefield, Bengaluru",
    rent: 20000,
    type: "2BHK",
    rooms: 2,
    description:
      "Premium luxury 2BHK apartment in the heart of Whitefield. Suitable for 2 students who prefer a high-end lifestyle. Rooftop garden, swimming pool, and gym access included.",
    amenities: ["WiFi", "AC", "Swimming Pool", "Gym", "Rooftop Garden", "Security", "Parking", "Lift"],
    nearbyCollege: "Christ University",
    distanceFromCollege: "3.0 km",
    ownerName: "Aishwarya Menon",
    contact: "+91-9711223344",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
  },
];

module.exports = properties;
