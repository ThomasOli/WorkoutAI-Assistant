import React, {useState} from "react";
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
import './progressPage.css'

export const ProgressPage = () => {
  const [value, setValue] = React.useState(0);
  const [tasks, setTasks] = useState([
    {
      workoutName: 'Workout 1',
      exercises: ['Exercise A', 'Exercise B', 'Exercise C'],
      timeRep: [30, 15, 45],  // representing time in seconds or reps per exercise
      checked: [false, false, false],  // status for each exercise
      isFavorite: false,
    },
    {
      workoutName: 'Workout 2',
      exercises: ['Exercise X', 'Exercise Y', 'Exercise Z'],
      timeRep: [60, 12, 30],  // representing time in seconds or reps per exercise
      checked: [false, false, false],  // status for each exercise
      isFavorite: false,
    },
    {
      workoutName: 'Workout 3',
      exercises: ['Exercise S', 'Exercise T', 'Exercise R'],
      timeRep: [3, 1, 1/2],  // representing time in seconds or reps per exercise
      checked: [false, false, false],  // status for each exercise
      isFavorite: false,
    }
    // Add more tasks as needed
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckboxChange = (taskName, index) => {
    const updatedTasks = tasks.map((task) =>
      task.workoutName === taskName ? { ...task, checked: [...task.checked.slice(0, index), !task.checked[index], ...task.checked.slice(index + 1)] } : task
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
  
  const handleCopyTask = (targetTab, taskName) => {
    // Check if the task is already in the In Progress tab
    const isInProgress = tasks.some((task) => task.workoutName === taskName);
    if (!isInProgress) {
      // Find the task in the Completed or Favorites tab
      const sourceTab = targetTab === 'completed' ? completedTasks : favoriteTasks;
      const taskToCopy = sourceTab.find((task) => task.workoutName === taskName);
      // Check if the task to copy is not undefined
      if (taskToCopy) {
        // If the task is from the Completed tab, remove it from the Completed tab
        if (targetTab === 'completed') {
          const updatedCompletedTasks = completedTasks.filter((task) => task.workoutName !== taskName);
          setCompletedTasks(updatedCompletedTasks);
        }
        // Add the task to the In Progress tab
        setTasks([...tasks, { ...taskToCopy, checked: taskToCopy.checked.map(() => false) }]);
      }
    }
  };

  return (
    <div className='progress-screen'>
      <UserNavbar/>  
        <div className='overlay-background'>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="In Progress" component={Link} to="/page/:id/in-progress" />
            <Tab label="Completed" component={Link} to="/page/:id/completed" />
            <Tab label="Favorites" component={Link} to="/page/:id/favorites" />
          </Tabs>

          <Box mt={4} position='static' minHeight={'70vh'} marginBottom={'10px'}>
          <Typography component="div" role="tabpanel" hidden={value !== 0}>
            {tasks.map((task) => (
              <Accordion key={task.id} disabled={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${task.workoutName}-content`} id={`panel-${task.workoutName}-header`}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <IconButton onClick={() => handleFavoriteToggle(task.workoutName)} color={task.isFavorite ? 'primary' : 'default'}>
                      {task.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Typography>{task.workoutName}</Typography>
                  </div>
                  <IconButton onClick={() => handleCopyTask('inProgress', task.workoutName)}>
                    <FileCopyIcon />
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <table>
                    <thead>
                      <tr>
                        <th style={{width: '40%'}}>Progress</th>
                        <th style={{width: '40%'}}>Exercise</th>
                        <th style={{width: '40%'}}>Number of Reps/Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {task.checked.map((checkbox, index) => (
                        <tr key={index}>
                          <td>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checkbox}
                                  onChange={() => handleCheckboxChange(task.workoutName, index)}
                                  disabled={false}
                                />
                              }
                            />
                          </td>
                          <td>{task.exercises[index]}</td>
                          <td>{task.timeRep[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AccordionDetails>
              </Accordion>
            ))}
          </Typography>
        <Typography component="div" role="tabpanel" hidden={value !== 1}>
              {completedTasks.map((completedTask) => (
                <Accordion key={completedTask.workoutName} disabled={false}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${completedTask.workoutName}-content`} id={`panel-${completedTask.workoutName}-header`}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleFavoriteToggle(completedTask.workoutName)} color={completedTask.isFavorite ? 'primary' : 'default'}>
                        {completedTask.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                      <Typography>{completedTask.workoutName}</Typography>
                    </div>
                    <IconButton onClick={() => handleCopyTask('completed', completedTask.workoutName)}>
                      <FileCopyIcon />
                  </IconButton>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: '40%' }}>Exercise</th>
                          <th style={{ width: '40%' }}>Number of Reps/Time</th>
                        </tr>
                      </thead>
                      <tbody>
                      {completedTask.exercises.map((exercise, index) => (
                        <tr key={index}>
                          <td>{exercise}</td>
                          <td>{completedTask.timeRep[index]}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Typography>
            <Typography component="div" role="tabpanel" hidden={value !== 2}>
              {favoriteTasks.map((favoriteTask) => (
                <Accordion key={favoriteTask.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${favoriteTask.workoutName}-content`} id={`panel-${favoriteTask.workoutName}-header`}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleFavoriteToggle(favoriteTask.workoutName)} color="primary">
                        <FavoriteIcon />
                      </IconButton>
                      <Typography>{favoriteTask.workoutName}</Typography>
                    </div>
                    <IconButton onClick={() => handleCopyTask('favorite', favoriteTask.workoutName)}>
                      <FileCopyIcon />
                    </IconButton>
                  </AccordionSummary>
                  <AccordionDetails>
                  <table>
                      <thead>
                        <tr>
                          <th style={{ width: '40%' }}>Exercise</th>
                          <th style={{ width: '40%' }}>Number of Reps/Time</th>
                        </tr>
                      </thead>
                      <tbody>
                      {favoriteTask.exercises.map((exercise, index) => (
                        <tr key={index}>
                          <td>{exercise}</td>
                          <td>{favoriteTask.timeRep[index]}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Typography>
          </Box>
        </div>   
    </div>

  )
}

export default ProgressPage