/**
 * Company facts transcribed from the printed brochure — edit here to update
 * phone numbers, branches, services or social links anywhere on the site.
 */
const company = {
  name: 'Fantastic Tourist Service',
  tagline: 'Look to us to see the spirit of travelling',
  motto: 'To travel is to awaken',
  since: 1985,
  iso: 'An ISO 9001-2015 Certified Company',
  phones: ['93 88 29 59 29', '99 47 41 8000', '99 47 46 8000'],
  helpline: '9388295929',
  whatsapp: 'https://wa.me/919388295929', // helpline number — change if needed
  email: 'fantastictourist@gmail.com',
  website: 'https://fantastictourist.com',
  facebook: 'https://www.facebook.com/fantastictouristservicekerala',
  instagram: 'https://www.instagram.com/fantastictouristservicekerala/',
  instagramHandle: '@fantastictouristservicekerala',
  map: {
    lat: 11.3219059,
    lng: 75.9978715,
    label: 'Fantastic Tourist Service — H.O. Mukkam, Kozhikode',
    embed:
      'https://www.google.com/maps?q=11.3219059,75.9978715&z=15&output=embed',
    link: 'https://maps.app.goo.gl/zKFoCtSJ8yeLjtyL6',
  },
  about:
    'Fantastic Tourist Service is a leading travel wholesaler conducting pleasure trips to attractive tourist centres all over India. Established in 1985, we now run more than 10 branches across Kerala with a 50+ strong team of experienced managers, staff and professional drivers — backed by a large fleet of new vehicles, a dedicated quality-control department, luxury accommodation and impeccable food at competitive rates.',
  stats: [
    { value: 1985, label: 'Serving travellers since', from: 1940, plain: true },
    { value: 10, label: 'Branches across Kerala', suffix: '+' },
    { value: 50, label: 'Dedicated staff & drivers', suffix: '+' },
    { value: 11, label: 'Signature destinations', suffix: '+' },
  ],
  services: [
    { icon: 'route', title: 'All-India Package Tours', text: 'Curated flight, train and bus pleasure trips to tourist centres across India — Kashmir to Kanyakumari.' },
    { icon: 'bus', title: 'Luxury Coach Fleet', text: 'A/C & non-A/C video coaches with push-back seats, mini buses, travellers, Innova and cars — all maintained by our own quality-control team.' },
    { icon: 'boat', title: 'Backwater Houseboats', text: 'Special backwater packages and overnight house-cruises through Alappuzha and Kuttanad — our home speciality.' },
    { icon: 'heart', title: 'Honeymoon Specials', text: 'Handcrafted couple itineraries with premium stays, candle-light dinners and photo-perfect routes.' },
    { icon: 'temple', title: 'Pilgrim Tours', text: 'Weekly services to Velankanni & Ervadi, monthly Sabarimala service, plus Rameshwaram, Madurai and Palani circuits.' },
    { icon: 'hotel', title: 'Hotel Reservations', text: 'Luxury and budget stays booked across India at competitive, negotiated rates.' },
    { icon: 'plane', title: 'Air Ticket Booking', text: 'Domestic and international air tickets with honest fares and quick confirmations.' },
    { icon: 'ticket', title: 'All-India Bus Tickets', text: 'Daily trips to Bangalore, Trivandrum, Hyderabad, Chennai & Coimbatore, and bus tickets for every route in India.' },
  ],
  alsoCovered: [
    'Munnar', 'Shimla', 'Kulu', 'Pondicherry', 'Bangalore', 'Kanyakumari',
    'Thiruvananthapuram', 'Palani', 'Athirappally', 'Hogenakkal', 'Avalanche', 'Wagamon',
  ],
  branches: [
    { name: 'H.O. Mukkam', phones: ['9447 45 8000', '9645 77 77 91', '0495-229 70 43'], head: true },
    { name: 'Kozhikode', phones: ['9447 41 8000', '9446 84 35 39'] },
    { name: 'Kalpetta', phones: ['9447 41 8000', '9446 36 82 43'] },
    { name: 'Manjeri', phones: ['9947 43 8000'] },
    { name: 'Perinthalmanna', phones: ['99 47 43 8000'] },
    { name: 'Malappuram', phones: ['99 47 45 8000'] },
    { name: 'Areacode', phones: ['0483-320 81 43', '94002 17468'] },
    { name: 'Thamarassery', phones: ['99 47 45 8000'] },
    { name: 'S. Batheri', phones: ['04936-322 143'] },
    { name: 'Bangalore', phones: ['9388 29 59 29'] },
    { name: 'Trivandrum', phones: ['9388 29 59 29', '7025 29 59 99'] },
  ],
};

export default company;
