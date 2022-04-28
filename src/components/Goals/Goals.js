import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { UserToLocal } from '../../util/util';

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

  UserToLocal(userState, setUserState);
  //function above stores user data locally to state so they persist through refresh
  const handleDelete = async (e) => {};

  return (
    <div>
      <h1>Goals</h1>
      <p>Hey {userState.firstName}</p>
      <main>
        {testGoals.map((goal, index) => {
          return (
            <article key={index}>
              <p>{goal.goal}</p>
              <button
                type="delete"
                value="delete"
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                Delete goal
              </button>
              <button>Goal complete</button>
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
