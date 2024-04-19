import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
import { format } from 'date-fns';
import './progressPage.css';
// import { set } from "mongoose";

export const ProgressPage = () => {
  const { userId } = useParams();
  const [value, setValue] = React.useState(0);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckboxChange = (taskName, index) => {
    const date = new Date();
    const formattedDate = format(date, 'MM/dd/yyyy');
    const updatedTasks = tasks.map((task) =>
      task.name === taskName ? { ...task, dateUpdated: formattedDate, completed: [...task.completed.slice(0, index), !task.completed[index], ...task.completed.slice(index + 1)] } : task
    );

    setTasks(updatedTasks);

    // Check if all checkboxes for the task are marked
    if (updatedTasks.find((task) => task.name === taskName)?.completed.every((checkbox) => checkbox)) {
      // Move the task to the Completed tab
      const completedTask = updatedTasks.find((task) => task.name === taskName);
      setCompletedTasks([...completedTasks, completedTask]);
      
      // Remove the task from the In Progress tab
      setTasks(updatedTasks.filter((task) => task.name !== taskName));
    }

    // Update expanded accordion items
    if (!expandedAccordions.includes(taskName)) {
      setExpandedAccordions([...expandedAccordions, taskName]);
    }
    console.log(expandedAccordions);
  };

  const handleFavoriteToggle = (taskName) => {
    const updatedTasks = tasks.map((task) =>
      task.name === taskName ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setTasks(updatedTasks);

    const updatedCompletedTasks = completedTasks.map((task) =>
        task.name === taskName ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setCompletedTasks(updatedCompletedTasks);

    const favoriteTask = updatedTasks.find((task) => task.name === taskName);
    const favoriteTaskTwo = updatedCompletedTasks.find((task) => task.name === taskName);

    if (favoriteTask) {
        if (favoriteTask.isFavorite) {
            setFavoriteTasks([...favoriteTasks, favoriteTask]);
        } else {
            setFavoriteTasks(favoriteTasks.filter((task) => task.name !== taskName));
        }
    } else if (favoriteTaskTwo) {
        if (favoriteTaskTwo.isFavorite) {
            setFavoriteTasks([...favoriteTasks, favoriteTaskTwo]);
        } else {
            setFavoriteTasks(favoriteTasks.filter((task) => task.name !== taskName));
        }
    }
    // Update expanded accordion items
    if (!expandedAccordions.includes(taskName)) {
      setExpandedAccordions([...expandedAccordions, taskName]);
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
    } else if (tasks.some((task) => task.name === newWorkoutName)) {
      setCopyError("A copy already exists under this name");
    } else if (completedTasks.some((task) => task.name === newWorkoutName)) {
      setCopyError("A copy already exists under this name");
    } else if (favoriteTasks.some((task) => task.name === newWorkoutName)) {
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

  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const Workout = ({workouts, tab, showChecks}) => {
    // ISSUE: Accordion continues to collapses every time you click on it. NEED TO FIX THIS
    // Make array
    // workouts.map((workout) => console.log("Expand value ", workout.workoutName, ": ", workout.isExpand));
    return (
      <Typography component="div" role="tabpanel" hidden={value !== tab}>
        {workouts.map((workout, index) => 
        // expanded={expanded === data.id} onChange={handleExpand(data.id)} onChange={workout.isExpand = !workout.isExpand}
        // expanded={workout.isExpand} onClick={toggleAccordion(tab, workout.workoutName)}
        // aria-controls={`panel-${workout.workoutName}-content`}
          <Accordion key={workout.name} disabled={false} expanded={expandedAccordions.includes(workout.name)}
          onChange={() => {
            setExpandedAccordions((prevExpanded) =>
              prevExpanded.includes(workout.name)
                ? prevExpanded.filter((item) => item !== workout.name)
                : [...prevExpanded, workout.name]
            );
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id={`panel-${workout.name}-header`}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <IconButton onClick={(event) => {event.stopPropagation(); handleFavoriteToggle(workout.name)}} sx={{
                  color: workout.isFavorite ? '#ffad41' : 'default', // Use 'inherit' for the default color
                }}>
                  {workout.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography sx={{fontFamily: 'Questrial, sans-serif', fontSize: '24px', fontWeight: '600', width: '50%'}}>{workout.name}</Typography>
                <Typography sx={{fontSize: '12px', textAlign: 'right', width: '80%', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300'}}>Date Created: {workout.dateCreated.toString()} &nbsp; &nbsp; &nbsp; &nbsp; Date Updated: {workout.dateUpdated.toString()}</Typography>
                <IconButton onClick={(event) => {event.stopPropagation(); handleCopyTask(tab, workout.name)}}>
                  <FileCopyIcon />
                </IconButton>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <table style={{align: 'right'}}>
                <thead>
                  <tr>
                    {showChecks && <th style={{width: '10%', textAlign: 'left', fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Progress</th>}
                    <th style={{width: '25%', textAlign: 'left', paddingLeft: '10px', fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Exercise</th>
                    <th style={{width: '15%', textAlign: 'left', paddingLeft: '10px', fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Reps/Time</th>
                    <th style={{width: '15%', textAlign: 'left', paddingLeft: '10px', fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Sets</th>
                    <th style={{width: '15%', textAlign: 'left', paddingLeft: '10px',  fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Rest</th>
                    <th style={{width: '30%', textAlign: 'left', paddingLeft: '10px',  fontFamily: 'Questrial, sans-serif', fontSize: '20px', fontWeight: '500'}}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {workout.completed.map((checkbox, index) => (
                    <tr key={index}>
                      {showChecks && <td style={{width: '10%'}}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkbox}
                              onChange={(event) => {event.stopPropagation(); handleCheckboxChange(workout.name, index)}}
                              disabled={false}
                            />
                          }
                        />
                      </td>}
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.exercises[index].name}</td>
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.exercises[index].reps}</td>
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.exercises[index].sets}</td>
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '18px'}}>{workout.exercises[index].rest}</td>
                      <td style={{paddingLeft: '10px', fontFamily: 'Hind Vadodara, sans-serif', fontWeight: '300', fontSize: '14px'}}>{workout.exercises[index].additional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        )}
      </Typography>
      // <div> testing </div>
    )
  };

  const setUser = (data) => {
    // setting user initial favorites
    data.map((task) => task.isFavorite ? setFavoriteTasks([...favoriteTasks, task]) : null);
    // data.map((task) => task.completed.every(value => value === true) ? setCompletedTasks([...completedTasks, task]) : setTasks(...tasks, task));
    data.map((task) => setExpandedAccordions([...expandedAccordions, task.name]));
    console.log("User Tasks", tasks);
    console.log("User Fav:", favoriteTasks);
    console.log("User Completed:", completedTasks);
  }

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/workouts', {params: {userId: userId}});
        // const res1 = await axios.get('http://localhost:5000/api/completed', {userId});
        const workouts = res.data;
        console.log(workouts);
        console.log("Workout data:", res.data);
        console.log("On to Setting Tasks");
        setTasks(res.data);
        // console.log("Set Tasks", tasks);
        // tasks.map((task) => handleFavoriteToggle(task.name));
        // console.log("fav:", favoriteTasks);
        // tasks.map((task, index) => handleCheckboxChange(task.name, index));
        // console.log("completed: ", completedTasks);
        // const test = await axios.get('http://localhost:5000/api/completed');
        // console.log(test);
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
  }, [userId]);

  useEffect(() => {
    if(!dialogOpen && dialogSubmit && newWorkoutName !== '') {
      const taskToCopy = targetTab.find((task) => task.workoutName === ogWorkoutName);
      // updating the in progress tasks
      // copied task progress is reset and is not a favorite
      const date = new Date();
      const formattedDate = format(date, 'MM/dd/yyyy');
      if(taskToCopy) { // ensures taskToCopy is not empty
        const copied = { ...taskToCopy, name: newWorkoutName, competed: taskToCopy.completed.map(() => false), dateCreated: formattedDate, dateUpdated: formattedDate, isFavorite: false};
        setTasks(prevTasks => [...prevTasks, copied]); // Use functional update form of setTasks
        // Update expanded accordion items
        if (!expandedAccordions.includes(copied.workoutName)) {
          setExpandedAccordions([...expandedAccordions, copied.workoutName]);
        }
      }
      // resets newWorkoutName to avoid infinite loops
      setNewWorkoutName('');
      setDialogSubmit(false);
    }
  }, [dialogOpen, dialogSubmit, newWorkoutName, ogWorkoutName, targetTab, expandedAccordions]);

  return (
    <div className='progress-screen'>
      <UserNavbar/>  
        <div className='overlay-background'>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#102D3D",
            },
            "& .MuiTab-root.Mui-selected": {
              color: '#102D3D'
            },
            backgroundColor: "#F8C995",
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

