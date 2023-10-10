import Summary from './Summary'
import AvailableMeals from './AvailableMeals'
import {Fragment} from 'react'
const Meals = () => {
    return (
        <Fragment>
            <Summary/>
            <AvailableMeals/>
        </Fragment>
    );
}
export default Meals;