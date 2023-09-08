import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import './App.css';

export default function App (){
  const [students, setStudent] = useState([]);
  //State
  const [createform, setCreateForm] = useState({
    fname: "",
    lname: "",
    age: "",
    course: "",
    section: "",
  });

  const[updateForm, setUpdateForm] = useState({
    _id: null,
    fname: "",
    lname: "",
    age: "",
    course: "",
    section: "",
  })

            //UseEffects
            useEffect(() => {
              router();
          }, [])

          //Function Get
        const router = async () => {
            const res = await axios.get("http://localhost:4000/student/getAll");
            setStudent(res.data);
            console.log(res.data)
        };

       //Form Field
        const updateCreateFormField = (e) =>{
          const {name, value} = e.target;

          setCreateForm({
            ...createform,
            [name]: value,
          })
        };

          //Funtion Create/Post
          const student = async (e) => {
            e.preventDefault();
          
            const res = await axios.post("http://localhost:4000/student/add", createform);
          
            // Clear form input fields first
            setCreateForm({
              fname: "",
              lname: "",
              age: "",
              course: "",
              section: "",
            });
          
            // Update the students state with the new student data
            setStudent([...students, res.data]);
          };
          
        //Function Delete
        const deleteData = async (_id) =>{
          const res = await axios.delete(`http://localhost:4000/student/delete/${_id}`);
          //Update
          const newData = [...students].filter((student) =>{
            return student._id !== _id;
        });
        setStudent(newData);
        };
        //Function Update
        const updateFieldChange = (e) =>{
          const {name, value} = e.target

          setUpdateForm({
            ...updateForm,
            [name]: value,
          })
        };
        const updateData = (student) =>{
            setUpdateForm({fname: student.fname, 
              lname: student.lname, 
              age: student.age, 
              course: student.course, 
              section: student.section,
            _id: student._id})

        };
        const studentUpdate = async (e) =>{
          e.preventDefault
          const {fname, lname, age, course, section} = updateForm
          //Update req
          const res = await axios.put(`http://localhost:4000/student/update/${updateForm._id}`, {fname, lname, age, course, section});
          console.log(res);
        };

        return (
          <div className='student-list'>
        <h1>Students:</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Section</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.fname}</td>
                <td>{student.lname}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>{student.section}</td>
                <td>
                  <button onClick={() => deleteData(student._id)}>Delete</button>
                  <button onClick={() => updateData(student)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

              {updateForm._id && <div className='update'>
                <h1>Update: </h1>
                <form onSubmit = {studentUpdate}>
                  <input onChange = {updateFieldChange} value = {updateForm.fname} name = "fname" placeholder = "First Name"/>
                  <input onChange = {updateFieldChange} value = {updateForm.lname} name = "lname" placeholder = "Last Name"/>
                  <input onChange = {updateFieldChange} value = {updateForm.age} name = "age" placeholder = "Age"/>
                  <input onChange = {updateFieldChange} value = {updateForm.course} name = "course" placeholder = "Course"/>
                  <input onChange = {updateFieldChange} value = {updateForm.section} name = "section" placeholder = "Section"/>
                  <button type = "submit">Update Button</button>
                </form>
              </div>}

            {!updateForm._id && <div>
              <form onSubmit={student}>
              <h1>POST:</h1>
                <input onChange={updateCreateFormField} value={createform.fname} name="fname" placeholder="First Name"></input>
                <input onChange={updateCreateFormField} value={createform.lname} name="lname" placeholder="Last Name" />
                <input onChange={updateCreateFormField} value={createform.age} name="age" placeholder="Age" />
                <input onChange={updateCreateFormField} value={createform.course} name="course" placeholder="Course" />
                <input onChange={updateCreateFormField} value={createform.section} name="section" placeholder="Section" />
                <button type="submit">Create</button>
              </form>
            </div>}
          </div>
        );
        
}