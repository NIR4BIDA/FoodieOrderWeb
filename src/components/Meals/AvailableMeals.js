import MealItem from './MealItem'
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import {useEffect,useState} from 'react'
const AvailableMeals = () =>
{
    const [meals,setMeals]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState(false);
    const fetchHandler= async ()=>{
        const response= await fetch('https://react-http-b994f-default-rtdb.firebaseio.com/meals.json');
        if(!response.ok){
            throw new Error('something is wrong');
        }
        const data= await response.json();
        const foods=[];
        for(const key in data){
            foods.push(
                {
                    id:key,
                    name:data[key].name,
                    description:data[key].description,
                    price:data[key].price,
                }
            );
        }
        setIsLoading(false);
        setMeals(foods);
    }
    useEffect(()=>{
        fetchHandler().catch(
            (error)=>{
            setError(error.message);
            setIsLoading(false);
        });
        },[]);
    const showList = meals.map((meal) => {
    return <MealItem meal = {meal} />
    }
    );
    
    return (
        <section className = {classes.meals}>
            <Card>
                {isLoading?<p>loading...</p>:''}
                {error?<p>{error}</p>:<ul>{showList}</ul>}
            </Card>
        </section>
    );
}
export default AvailableMeals;