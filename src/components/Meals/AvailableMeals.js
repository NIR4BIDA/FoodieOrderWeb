import MealItem from './MealItem'
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
const AvailableMeals = () =>
{
    const meals = 
    [
        {
            id:'e-1',
            name:'food1',
            description: 'f1 text',
            price:10,
        },
        {
            id:'e-2',
            name:'food2',
            description: 'f2 text',
            price:20,
        },
        {
            id:'e-3',
            name:'food3',
            description: 'f3 text',
            price:30,
        },
    ];
    const showList = meals.map((meal) => {
    return <MealItem meal = {meal} />
    }
    );
    return (
        <section className = {classes.meals}>
            <Card>
                <ul>
                    {showList}
                </ul>
            </Card>
        </section>
    );
}
export default AvailableMeals;