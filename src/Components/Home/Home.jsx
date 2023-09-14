import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBookOpen } from "react-icons/fa";



const Home = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [remainingCredit, setRemainingCredit] = useState(20);
    const [totalCreditHour, setTotalCreditHour] = useState(0);
    
    useEffect(() => {
        fetch('./data.json')
        .then(res => res.json())
        .then (data=> setCourses(data))
    }, [])


    const handleSelectedCourse = (course) => {

        const isExist = selectedCourse.find(singleSelectedCourse=> singleSelectedCourse.id == course.id)
        let creditHour = course.creditHours;
        const maxCredit = 20;
        if (isExist) {
           return toast('This Course Already Selected!');
        }
        else {
            selectedCourse.forEach(item => {
            creditHour += item.creditHours;
            })
            const remainingCredit = maxCredit - creditHour;
            if (creditHour > maxCredit) {
                return toast('You Cant Exceed the Maximum Credit Hours')
            }
            else {
                setTotalCreditHour(creditHour);
                setRemainingCredit(remainingCredit);
                setSelectedCourse([...selectedCourse, course]);
            }  
        }

    }




    console.log(selectedCourse);

    return (
        <div className=' text-center font-bold'>
            <h2 className=' text-center font-bold bg-red-400'>Course Registration of PH with Shariar Islam</h2>
            <div className='flex justify-between'>
                <div>
                    <h2>Course here</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    courses.map((course, idx) => (
                        <div key={idx} className='mr-3 ml-3 mt-4 mb-5'>
                                <img className='w-full' src={ course.image}></img>
                                <h2>{course.courseName}</h2>
                                <p>{course.shortDescription}</p>
                                <div className='flex justify-evenly'>
                                <h4>$ Price: {course.price}</h4>
                                <h2><FaBookOpen></FaBookOpen></h2>
                                <h4>Credit: { course.creditHours}hr</h4>
                                </div>
                            <button onClick={() => handleSelectedCourse(course)} className='bg-blue-700 text-white px-5 py-3'>Select</button>
                            

                        </div>
                ))
                }
                </div>
                </div>

                    <Cart selectedCourse={selectedCourse} remainingCredit={remainingCredit} totalCreditHour={totalCreditHour}></Cart>
                    <ToastContainer></ToastContainer>
                
            </div>
        </div>
    );
};

export default Home;