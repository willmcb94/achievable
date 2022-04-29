import { push, ref } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { db } from '../../firebase';
import { UserToLocalStorage } from '../../util/util';
import AddMiniTask from './AddMiniTask/AddMiniTask';
import './AddAGoal.css';

const intialFormData = Object.freeze({
  goal: '',
  date: '',
});

export default function AddAGoal() {
  const [formData, setFormData] = useState(intialFormData);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userState, setUserState] = useState(user);
  const [miniTasks, setMiniTasks] = useState([]);
  const [rating, setRating] = useState(5);

  UserToLocalStorage(userState, setUserState);
  //function above stores user data locally to state so they persist through refresh
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, '<<<<');
    try {
      await push(ref(db, `data/goals/${userState.uid}`), {
        goal: formData.goal,
        date: formData.date,
        miniTasks: miniTasks,
      });
      navigate('/goals');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <main>
        <h1>hey {userState.firstName}</h1>
        <form className="add-goal-form">
          <textarea
            name="goal"
            placeholder="Your new goal here..."
            onChange={(e) => {
              handleChange(e);
            }}
            required
          ></textarea>
          <label>Date to complete by: </label>
          <input
            type="date"
            name="date"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          ></input>
          <AddMiniTask miniTasks={miniTasks} setMiniTasks={setMiniTasks} />
          <label>Please select importance </label>

          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
          <button type="cancel" onClick={() => navigate('/goals')}>
            Cancel
          </button>
        </form>
      </main>
    </div>
  );
}
