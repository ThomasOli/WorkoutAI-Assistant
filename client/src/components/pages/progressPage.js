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
  const [tasks, setTasks] = useState([
    {
      id: 3,
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
      expand: false
    },
    {
      id: 12,
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
      expand: false
    },
    {
      id: 293,
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
      expand: false
    }
    // Add more tasks as needed
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [favoriteTasks, setFavoriteTasks] = useState([]);

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
      task.workoutName === taskName ? { ...task, dateUpdated: new Date(), checked: [...task.checked.slice(0, index), !task.checked[index], ...task.checked.slice(index + 1)], expand: false } : task
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
      task.workoutName === taskName ? { ...task, isFavorite: !task.isFavorite, expand: false } : task
    );
    setTasks(updatedTasks);

    const updatedCompletedTasks = completedTasks.map((task) =>
        task.workoutName === taskName ? { ...task, isFavorite: !task.isFavorite, expand: false } : task
    );
    setCompletedTasks(updatedCompletedTasks);

    const favoriteTask = updatedTasks.find((task) => task.workoutName === taskName);
    const favoriteTaskTwo = updatedCompletedTasks.find((task) => task.workoutName === taskName);

    if (favoriteTask) {
        if (favoriteTask.isFavorite) {
            setFavoriteTasks([...favoriteTasks, favoriteTask]);
        } else {
            setFavoriteTasks(favoriteTasks.filter((task) => task.workoutName !== taskName));
        }
    } else if (favoriteTaskTwo) {
        if (favoriteTaskTwo.isFavorite) {
            setFavoriteTasks([...favoriteTasks, favoriteTaskTwo]);
        } else {
            setFavoriteTasks(favoriteTasks.filter((task) => task.workoutName !== taskName));
        }
    }
  };

  // used for copying tasks
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [targetTab, setTargetTab] = useState([]);
  const [ogWorkoutName, setOgWorkoutName] = useState('');
  const [dialogSubmit, setDialogSubmit] = useState(false); // ensures the save button is clicked

  const handleCopyTask = (targetTab, taskName) => {
    if(targetTab === 0) {
      targetTab = tasks;
    } else if (targetTab === 1) {
      targetTab = completedTasks;
    } else if (targetTab === 2) {
      targetTab = favoriteTasks;
    }

    const defaultName = `${taskName} (Copy)`;
    // Open the dialog when the copy icon is clicked
    setDialogOpen(true);
    setOgWorkoutName(taskName);
    setTargetTab(targetTab);
    console.log("Target Tab:", targetTab);
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

  const [copyError, setCopyError] = useState('');
  // Function to handle submitting the new workout name
  const handleSubmitNewWorkoutName = () => {
    if(newWorkoutName === "") {
      setCopyError("Workout name can't be empty");
    } else if (tasks.some((task) => task.workoutName === newWorkoutName)) {
      setCopyError("A copy already exists under this name");
    } else {
      setCopyError("");
      // Do something with the new workout name
      // For example, update the workout name in the state or perform any other action
      console.log('New workout name:', newWorkoutName);
      // Close the dialog
      setDialogOpen(false);
      setDialogSubmit(true); // ensures that user clicked save
    }
  };

  const Workout = ({workouts, tab, showChecks}) => {
    // ISSUE: Accordion continues to collapses every time you click on it. NEED TO FIX THIS
    // Make array
    return (
      <Typography component="div" role="tabpanel" hidden={value !== tab}>
        {workouts.map((workout, index) => 
          <Accordion key={workout.workoutName} disabled={false} expand={workout.expand}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={workout.expand = !workout.expand} aria-controls={`panel-${workout.workoutName}-content`} id={`panel-${workout.workoutName}-header`}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <IconButton onClick={() => handleFavoriteToggle(workout.workoutName)} sx={{
                  color: workout.isFavorite ? '#ffad41' : 'default', // Use 'inherit' for the default color
                }}>
                  {workout.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography sx={{fontFamily: 'Questrial, sans-serif', fontSize: '24px', fontWeight: '600'}}>{workout.workoutName}</Typography>
                <IconButton onClick={() => handleCopyTask(tab, workout.workoutName)}>
                  <FileCopyIcon />
                </IconButton>
                <Typography sx={{fontSize: '12px', textAlign: 'right', width: '80%', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300'}}>Date Created: {workout.dateCreated} &nbsp; &nbsp; &nbsp; &nbsp; Date Updated: {workout.dateUpdated}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <table style={{align: 'right'}}>
                <thead>
                  <tr>
                    {showChecks && <th style={{width: '10%', textAlign: 'left', fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Progress</th>}
                    <th style={{width: '30%', textAlign: 'left', paddingLeft: '10px', fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Exercise</th>
                    <th style={{width: '15%', textAlign: 'left', paddingLeft: '10px', fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Reps/Time</th>
                    <th style={{width: '15%', textAlign: 'left', paddingLeft: '10px', fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Sets</th>
                    <th style={{width: '30%', textAlign: 'left', paddingLeft: '10px',  fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Weight Recommendation</th>
                    <th style={{width: '30%', textAlign: 'left', paddingLeft: '10px',  fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Type</th>
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
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.exercises[index]}</td>
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.timeRep[index]}</td>
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.sets[index]}</td>
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.weightRec[index]}</td>
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.type[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        )}
      </Typography>
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
  }, []);

  useEffect(() => {
    if(!dialogOpen && dialogSubmit && newWorkoutName !== '') {
      const taskToCopy = targetTab.find((task) => task.workoutName === ogWorkoutName);
      // updating the in progress tasks
      // copied task progress is reset and is not a favorite
      if(taskToCopy) { // ensures taskToCopy is not empty
        const copied = { ...taskToCopy, workoutName: newWorkoutName, checked: taskToCopy.checked.map(() => false), isFavorite: false, expand: false };
        setTasks(prevTasks => [...prevTasks, copied]); // Use functional update form of setTasks
      }
      // resets newWorkoutName to avoid infinite loops
      setNewWorkoutName('');
      setDialogSubmit(false);
    }
  }, [dialogOpen, dialogSubmit, newWorkoutName, ogWorkoutName, targetTab]);

  return (
    <div className='progress-screen'>
      <UserNavbar/>  
        <div className='overlay-background'>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#476e78", // Change green to the color you want
            },
            "& .MuiTab-root.Mui-selected": {
              color: '#476e78'
            },
            backgroundColor: "#f1e4e8",
          }}>
            <Tab label="In Progress" component={Link} to='/page/:id/in-progress' sx={{fontFamily: 'Source Sans Pro-Bold, monospace', fontSize: '24px', textTransform: 'none', color: '#666666'}}/>
            <Tab label="Completed" component={Link} to='/page/:id/completed' sx={{fontFamily: 'Source Sans Pro-Bold, monospace', fontSize: '24px', textTransform: 'none', color: '#666666'}}/>
            <Tab label="Favorites" component={Link} to='/page/:id/favorites' sx={{fontFamily: 'Source Sans Pro-Bold, monospace', fontSize: '24px', textTransform: 'none', color: '#666666'}}/>
          </Tabs>

          <Box mt={4} position='static' minHeight={'70vh'} marginBottom={'10px'}>
            <Workout workouts={tasks} tab={0} showChecks={true}/>
            <Workout workouts={completedTasks} tab={1} showChecks={false}/>
            <Workout workouts={favoriteTasks} tab={2} showChecks={false}/>
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
            error={copyError}
            helperText={copyError}
          />
          <Button onClick={handleSubmitNewWorkoutName}
            >Save</Button>
        </Dialog>
    </div>
  )
}

export default ProgressPage

