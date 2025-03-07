import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../redux/slices/taskSlice';
import { fetchWeather } from '../services/api';
import TaskInput from './TaskInput';
import { useTransition, animated } from '@react-spring/web';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const dispatch = useDispatch();

  // Fetch weather data
  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(city); // Fetch weather for the selected city
        setWeather(data);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };
    getWeather();
  }, [city]); // Re-fetch weather when the city changes

  // Animation for task list
  const transitions = useTransition(tasks, {
    keys: (task) => task.id,
    from: { opacity: 0, transform: 'translate3d(-50px, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50px, 0, 0)' },
  });

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-gradient-primary text-white">
          <h1 className="card-title display-4">To-Do App</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
          </div>
          {weather && (
            <p className="card-text lead">Current Weather in {city}: {weather.weather[0].description}</p>
          )}
        </div>
        <div className="card-body">
          {/* Task Input Field */}
          <TaskInput />

          {/* Task List */}
          <ul className="list-group mt-3">
            {transitions((style, task) => (
              <animated.li
                key={task.id}
                style={style}
                className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm"
              >
                <span className="h5">{task.text}</span>
                <span className="badge bg-info">{task.priority}</span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  Delete
                </button>
              </animated.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;