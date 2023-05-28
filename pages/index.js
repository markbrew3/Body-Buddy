import { useEffect, useState } from 'react';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import GoalBoard from '../components/GoalBoard';
import { getCurrGoal, getResetDay, getWorkoutsByWeekUid } from '../API/apiData';
import SetGoalModal from '../components/forms/SetGoalForm';
import ResetWeekButton from '../components/ResetWeekButton';
import SetResetDay from '../components/ResetDaySelector';

function Home() {
  const { user } = useAuth();
  const [goal, setGoal] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [day, setDay] = useState([]);
  const defualtGoal = [{
    backGoal: 0,
    bicepGoal: 0,
    calveGoal: 0,
    chestGoal: 0,
    frontDeltGoal: 0,
    gluteGoal: 0,
    hamstringGoal: 0,
    quadGoal: 0,
    rearSideDeltGoal: 0,
    tricepGoal: 0,
    weekNum: 1,
  }];

  const getTheResetDay = () => {
    getResetDay(user.uid).then(setDay);
  };

  const getCurrentGoal = () => {
    getCurrGoal(user.uid).then(setGoal);
  };

  const getWorkouts = () => {
    getWorkoutsByWeekUid(goal[0]?.weekUid).then(setWorkouts);
  };

  useEffect(() => {
    getCurrentGoal();
    getResetDay();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getWorkouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal]);

  if (goal.length === 0) {
    setGoal(defualtGoal);
  }

  return (
    <>
      <SetResetDay dayObj={day[0]} onUpdate={getTheResetDay} />
      <div
        className="d-flex justify-content-center"
        style={{
          marginTop: '1px',
          marginBottom: '25px',
        }}
      >
        <div style={{ marginRight: '25px', marginTop: '0px' }}>
          <SetGoalModal goalObj={goal[0]} onUpdate={getCurrentGoal} />
        </div>
        <div style={{ marginleft: '25px', marginTop: '0px' }}>
          <ResetWeekButton goalObj={goal[0]} onUpdate={getCurrentGoal} workoutsArray={workouts} />
        </div>
      </div>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          // height: '85vh',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {goal.map((obj) => <GoalBoard key={obj.firebaseKey} goalObj={obj} workoutsArray={workouts} />)}
        <div style={{ marginTop: '20px' }}>
          <h4 className="log-workout-text">Log Workout</h4>
          <Link href={`/${goal[0]?.weekUid}`} passHref>
            <Button className="nav-workouts-btn" variant="warning"><FontAwesomeIcon icon={faDumbbell} /></Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
