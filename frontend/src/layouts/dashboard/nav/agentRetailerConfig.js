// component
import { AiOutlineForm } from 'react-icons/ai';
import { FaWpforms } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { PiShippingContainer } from 'react-icons/pi';
import { useSelector } from 'react-redux';



// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;



const agentRetailerConfig = [

  {
    title: 'Retailers',
    
    path: `/dashboard/all-retailers-one-agent`,
    icon:<FaPerson style={{color:"white"}}/> /*icon('teacher')*/,
  },
 
  {
    title: 'Forms',
    path: '/dashboard/forms',
    icon: <AiOutlineForm style={{color:"white"}}/> /*icon('report')*/,
  },


 

];

export default agentRetailerConfig;
