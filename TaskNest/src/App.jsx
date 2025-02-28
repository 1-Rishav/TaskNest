import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState , setProjectsState] = useState({selectedProjectId:undefined,projects:[],tasks:[]})

  function handleAddTask(text){
setProjectsState((prevState)=>{
  const newTask={
    text:text,
    projectId:prevState.selectedProjectId,
    id:Math.random()
  }
  return{
    ...prevState,
    selectedProjectId:undefined,
    tasks:[newTask,...prevState.tasks]
  }
})
  }
  function handleDeleteTask(id){
    setProjectsState((prevState)=>{
      return{
        ...prevState,selectedProjectId:undefined,
        tasks:prevState.tasks.filter((task)=>{
          task.id!==id
        })
      }
    })
  }
  function handleStartAddProject(){
    setProjectsState(prevState=>{
      return {
        ...prevState,
        selectedProjectId:null,
      }
    });
  }
  const handleSelectProject=(id)=>{
    
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:id,
      }
    })
  }
  const handleCancelAddProject=()=>{
    
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
      }
    })
  }
  function handleAddProject(projectData){
    setProjectsState(prevState=>{
      const newProject = {
        ...projectData,id:Math.random()
      }
      return{
        ...prevState , projects:[...prevState.projects, newProject],selectedProjectId:undefined
      }
    })
  }
  function handleDeleteProject(){
    setProjectsState((prevState)=>{
      return{
        ...prevState,selectedProjectId:undefined,
        projects:prevState.projects.filter((project)=>{
          project.id!==prevState.selectedProjectId
        })
      }
    })
  }
const selectedProject = projectsState.projects.find(project=>project.id === projectsState.selectedProjectId);
  let content=<SelectedProject onDeleteTask={handleDeleteTask} onAddTask={handleAddTask} onDelete={handleDeleteProject} project={selectedProject} tasks={projectsState.tasks}/>;

  if(projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar  onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProject={projectsState.selectedProjectId}/>
    {content}
    </main>
  );
}

export default App;
