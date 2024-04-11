
import React, { useState, useEffect } from "react";
import axios from "axios";

import { UserNavbar } from "./userNavbar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "@mui/material";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './progressPage.css';
// import { set } from "mongoose";

// have a fetch function, array.map and render everything would need to 

export const ProgressPage = () => {
  const [value, setValue] = React.useState(0);
  const userLinks = {
    in: '/page/:id/in-progress', 
    comp: '/page/:id/completed', 
    fav: '/page/:id/favorites'
  }
  const [showChecks, setShowChecks] = useState(true);
  const [tasks, setTasks] = useState([
    {
      workoutName: 'Workout 1',
      exercises: ['Exercise A', 'Exercise B', 'Exercise C'],
      timeRep: [30, 15, '45 seconds'],  // representing time in seconds or reps per exercise
      sets: [3, 3, 3], // number of times you repeat the workout
      weightRec: ['30%', '50%', 'no weight'],
      type: ['strength', 'core', 'cardio'],
      dateCreated: '03/18/2024',
      dateUpdated: '03/18/2024',
      checked: [false, false, false],  // status for each exercise
      isFavorite: false,
    },
    {
      workoutName: 'Workout 2',
      exercises: ['Exercise X', 'Exercise Y', 'Exercise Z'],
      timeRep: [60, 12, 30],  // representing time in seconds or reps per exercise
      sets: [3, 3, 3], // number of times you repeat the workout
      weightRec: ['30%', '50%', 'no weight'],
      type: ['strength', 'core', 'cardio'],
      dateCreated: '03/18/2024',
      dateUpdated: '03/18/2024',
      checked: [false, false, false],  // status for each exercise
      isFavorite: false,
    },
    {
      workoutName: 'Workout 3',
      exercises: ['Exercise S', 'Exercise T', 'Exercise R'],
      timeRep: [3, 1, '30 seconds'],  // representing time in seconds or reps per exercise
      sets: [3, 3, 3], // number of times you repeat the workout
      weightRec: ['30%', '50%', 'no weight'],
      type: ['strength', 'core', 'cardio'],
      dateCreated: '03/18/2024',
      dateUpdated: '03/18/2024',
      checked: [false, false, false],  // status for each exercise
      isFavorite: false,
    }
    // Add more tasks as needed
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [favoriteTasks, setFavoriteTasks] = useState([]);
  // const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // const loadTask = async(e) => {
  //   // axios.get('/api/workouts')
  //   // Make a GET request to the API endpoint
    // const test = axios.get('/')
    // .then(response => {
    //   // Handle successful response
    //   console.log('Data:', response.data);
    // })
    // .catch(error => {
    //   // Handle errors
    //   console.error('Error fetching data:', error);
    // });
    // console.log(test);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckboxChange = (taskName, index) => {
    const updatedTasks = tasks.map((task) =>
      task.workoutName === taskName ? { ...task, dateUpdated: new Date(), checked: [...task.checked.slice(0, index), !task.checked[index], ...task.checked.slice(index + 1)] } : task
    );

    setTasks(updatedTasks);

    // Check if all checkboxes for the task are marked
    if (updatedTasks.find((task) => task.workoutName === taskName)?.checked.every((checkbox) => checkbox)) {
      // Move the task to the Completed tab
      const completedTask = updatedTasks.find((task) => task.workoutName === taskName);
      setCompletedTasks([...completedTasks, completedTask]);

      // Remove the task from the In Progress tab
      setTasks(updatedTasks.filter((task) => task.workoutName !== taskName));
    }
  };

  const handleFavoriteToggle = (taskName) => {
      const updatedTasks = tasks.map((task) =>
        task.workoutName === taskName ? { ...task, isFavorite: !task.isFavorite } : task
      );

      setTasks(updatedTasks);

      // Move the task to the Favorites tab
      const favoriteTask = updatedTasks.find((task) => task.workoutName === taskName);
      if (favoriteTask.isFavorite) {
        setFavoriteTasks([...favoriteTasks, favoriteTask]);
      } else {
        // Remove the task from the Favorites tab
        setFavoriteTasks(favoriteTasks.filter((task) => task.workoutName !== taskName));
      }
  };

  // used for copying tasks
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [targetTab, setTargetTab] = useState([]);
  const [ogWorkoutName, setOgWorkoutName] = useState('');
  const [dialogSubmit, setDialogSubmit] = useState(false); // ensures the save button is clicked

  const handleCopyTask = (targetTab, taskName) => {
    const defaultName = `${taskName} (Copy)`;
    // Open the dialog when the copy icon is clicked
    setDialogOpen(true);
    setOgWorkoutName(taskName);
    setTargetTab(targetTab);
    console.log('Dialog Open Before Setting Name: ', dialogOpen);
    // Set the default value for the new workout name
    setNewWorkoutName(defaultName); // Default value example
    console.log('Dialog Open After Setting Name: ', dialogOpen);
    console.log('In copy function', newWorkoutName);
  };

  // Function to handle dialog close
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Function to handle workout name change
  const handleChangeWorkoutName = (event) => {
    setNewWorkoutName(event.target.value);
  };

  // Function to handle submitting the new workout name
  const handleSubmitNewWorkoutName = () => {
    // Do something with the new workout name
    // For example, update the workout name in the state or perform any other action
    console.log('New workout name:', newWorkoutName);
    // Close the dialog
    setDialogOpen(false);
    setDialogSubmit(true); // ensures that user clicked save
  };

  const Workout = ({workout}) => {
    // ISSUE: Accordion continues to collapses every time you click on it. NEED TO FIX THIS
    return (
      <Accordion key={workout.id} disabled={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${workout.workoutName}-content`} id={`panel-${workout.workoutName}-header`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <IconButton onClick={() => handleFavoriteToggle(workout.workoutName)} color={workout.isFavorite ? 'primary' : 'default'}>
              {workout.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography>{workout.workoutName}</Typography>
          </div>
          <IconButton onClick={() => handleCopyTask(tasks, workout.workoutName)}>
            <FileCopyIcon />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <table style={{align: 'right'}}>
            <thead>
              <tr>
                {showChecks && <th style={{width: '10%', textAlign: 'left'}}>Progress</th>}
                <th style={{width: '30%', textAlign: 'left', paddingLeft: '10px'}}>Exercise</th>
                <th style={{width: '15%', textAlign: 'left', paddingLeft: '10px'}}>Reps/Time</th>
                <th style={{width: '15%', textAlign: 'left', paddingLeft: '10px'}}>Sets</th>
                <th style={{width: '30%', textAlign: 'left', paddingLeft: '10px'}}>Weight Recommendation</th>
                <th style={{width: '30%', textAlign: 'left', paddingLeft: '10px'}}>Type</th>
              </tr>
            </thead>
            <tbody>
              {workout.checked.map((checkbox, index) => (
                <tr key={index}>
                  {showChecks && <td style={{width: '10%'}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkbox}
                          onChange={() => handleCheckboxChange(workout.workoutName, index)}
                          disabled={false}
                        />
                      }
                    />
                  </td>}
                  <td style={{paddingLeft: '10px'}}>{workout.exercises[index]}</td>
                  <td style={{paddingLeft: '10px'}}>{workout.timeRep[index]}</td>
                  <td style={{paddingLeft: '10px'}}>{workout.sets[index]}</td>
                  <td style={{paddingLeft: '10px'}}>{workout.weightRec[index]}</td>
                  <td style={{paddingLeft: '10px'}}>{workout.type[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionDetails>
      </Accordion>
    )
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/workouts', {
          params: {
            userId: "123"
          }
        });
        console.log("Workout data:", res.data);
        console.log("response: ", res);
        // setTasks(res.exercises);
        // console.log("checking tasks")
        // console.log(tasks);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }

      // try {
      //   const res = await axios.get('http://localhost:5000/api/workouts/completed', {
      //     params: {
      //       UserId: '123'
      //     }
      //   });
      //   console.log("Completed Workout data:", res.Workout);
      //   setCompletedTasks(res.Workout);
      //   console.log("checking completed")
      //   console.log(completedTasks);
      // } catch (error) {
      //   console.error('Error fetching completed workouts:', error);
      // }
    };
    fetchWorkouts();
  }, [tasks, completedTasks]);

  useEffect(() => {
    if(!dialogOpen && dialogSubmit && newWorkoutName !== '') {
      const taskToCopy = targetTab.find((task) => task.workoutName === ogWorkoutName);
      // updating the in progress tasks
      // copied task progress is reset and is not a favorite
      if(taskToCopy) { // ensures taskToCopy is not empty
        const copied = { ...taskToCopy, workoutName: newWorkoutName, checked: taskToCopy.checked.map(() => false), isFavorite: false };
        setTasks([...tasks, copied]);
      }
      // resets newWorkoutName to avoid infinite loops
      setNewWorkoutName('');
      setDialogSubmit(false);
    }
  }, [dialogOpen, dialogSubmit, newWorkoutName, ogWorkoutName, targetTab, tasks]);

  return (
    <div className='progress-screen'>
      <UserNavbar/>  
        <div className='overlay-background'>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="In Progress" component={Link} to={userLinks[0]} />
            <Tab label="Completed" component={Link} to={userLinks[1]} />
            <Tab label="Favorites" component={Link} to={userLinks[2]}/>
          </Tabs>

          <Box mt={4} position='static' minHeight={'70vh'} marginBottom={'10px'}>
          <Typography component="div" role="tabpanel" hidden={value !== 0}>
            {tasks.map((task, index) => (
              <Workout key={index} workout={task} showChecks={() => setShowChecks(true)}/>
            ))}
          </Typography>
        <Typography component="div" role="tabpanel" hidden={value !== 1}>
              {completedTasks.map((completedTask, index) => (
                <Workout key={index} workout={completedTask} showChecks={() => setShowChecks(false)}/>
              ))}
            </Typography>
            <Typography component="div" role="tabpanel" hidden={value !== 2}>
              {favoriteTasks.map((favoriteTask, index) => (
                <Workout key={index} workout={favoriteTask} showChecks={() => setShowChecks(false)}/>
              ))}
            </Typography>
          </Box>
        </div>   
        {/* Add a dialog for changing the workout name */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Change Workout Name</DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            id="new-workout-name"
            label="New Workout Name"
            type="text"
            fullWidth
            value={newWorkoutName}
            onChange={handleChangeWorkoutName}
          />
          <Button onClick={handleSubmitNewWorkoutName}>Save</Button>
        </Dialog>
    </div>
  )
}

export default ProgressPage