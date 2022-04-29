import { onValue, ref, remove } from 'firebase/database';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { db } from '../../firebase';
import { UserToLocalStorage } from '../../util/util';

const testGoals = [
  {
    goal: 'Go to the gym 5 times a week',
    stars: 5,
  },
  {
    goal: 'Read for 10 hours per week',
    stars: 5,
  },
];

export default function Goals() {
  const { user } = useContext(UserContext);
  const [userState, setUserState] = useState(user);
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  UserToLocalStorage(userState, setUserState);
  //function above stores user data locally to state so they persist through refresh

  useEffect(() => {
    try {
      onValue(ref(db, `data/goals/${userState.uid}`), (userGoals) => {
        if (userGoals.val()) {
          setGoals(Object.entries(userGoals.val()));
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [userState, goals]);

  const handleDeleteComplete = async (goal) => {
    console.log(goal[0], '<---');
    remove(ref(db, `data/goals/${userState.uid}/${goal[0]}`));
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>Goals</h1>
      <p>Hey {userState.firstName}</p>
      <main>
        {goals.map((goal, index) => {
          return (
            <article key={index}>
              <p>{goal[1].goal}</p>
              <button
                type="delete"
                value="delete"
                onClick={() => {
                  handleDeleteComplete(goal);
                }}
              >
                Delete goal
              </button>
              <button
                type="delete"
                value="delete"
                onClick={() => {
                  handleDeleteComplete(goal);
                }}
              >
                Goal complete
              </button>
            </article>
          );
        })}
        <button type="add" value="Add">
          <Link to="/add-a-goal">Add a new goal</Link>
        </button>
      </main>
    </div>
  );
}
