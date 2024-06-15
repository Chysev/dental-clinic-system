import {
  faAddressBook,
  faHospitalUser,
  faBriefcase,
  faFileInvoice,
  faHeart,
  faHouseUser,
  faTooth,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { icon: faHouseUser, text: "Dashboard", link: "/dashboard", marginLeft: 1 },
  { icon: faTooth, text: "Dentists", link: "/dentist", marginLeft: 3 },
  { icon: faHeart, text: "Staffs", link: "/staffs", marginLeft: 2 },
  { icon: faHospitalUser, text: "Patients", link: "/patients", marginLeft: 1 },
  { icon: faBriefcase, text: "Services", link: "/services", marginLeft: 1 },
  {
    icon: faAddressBook,
    text: "Appointments",
    link: "/appointment",
    marginLeft: 1,
  },
  {
    icon: faAddressBook,
    text: "Today's Appt.",
    link: "/active-appointment",
    marginLeft: 1,
  },
  { icon: faFileInvoice, text: "Invoices", link: "/invoices", marginLeft: 3 },
  {
    icon: faUser,
    text: "Users",
    link: "/userlist",
    marginLeft: 2,
    ADMIN: true,
  },
];

export default navItems;
