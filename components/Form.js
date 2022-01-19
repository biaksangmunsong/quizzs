import { useState } from "react"
import { db } from "../fbinit"
import { doc, setDoc } from "firebase/firestore"
import StyledForm from "../styles/StyledForm"

const Form = ({userForm, setUserForm, setUserDetails}) => {

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    
    const handleInputChange = e => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (db && !loading){
            setLoading(true)
            setError(false)
            const userRef = doc(db, "users", userForm.email)
            const details = {
                email: userForm.email,
                fullName: userForm.fullName,
                phone: userForm.phone,
                description: userForm.description === "Professional" ? userForm.profession : userForm.description,
                lastTest: 0
            }
            setDoc(userRef, details)
            .then(() => {
                window.localStorage.setItem("email", userForm.email)
                setLoading(false)
                setUserDetails(details)
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            })
        }
    }
    
    return (
        <StyledForm>
            <div className="title"><a href="/">qui<span>zzs</span></a></div>
            <form onSubmit={handleFormSubmit}>
                <button type="button" onClick={() => window.history.back()}>
                    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="25,5 5,25 45,25 5,25 25,45" strokeWidth="4"/>
                    </svg>
                </button>
                <h2>Before you start</h2>
                <p>Please answer a few questions and you&apos;re ready to take the test.</p>
                <div className="fields">
                    <input type="email" required placeholder="Email Address *" onChange={handleInputChange} value={userForm.email} name="email"/>
                    <input type="text" required placeholder="Your Full Name *" onChange={handleInputChange} value={userForm.fullName} name="fullName"/>
                    <input type="text" placeholder="Phone Number" onChange={handleInputChange} value={userForm.phone} name="phone"/>
                    <select name="description" onChange={handleInputChange} value={userForm.description} required>
                        <option value="">What best describes you? *</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Student">Student</option>
                        <option value="Professional">Professional</option>
                    </select>
                    <input
                        type={userForm.description === "Professional" ? "text" : "hidden"}
                        name="profession"
                        placeholder="Your Profession *"
                        onChange={handleInputChange}
                        value={userForm.profession}
                        required={userForm.description === "Professional" ? true : false}
                    />
                </div>
                <button type="submit" className={loading ? "loading" : ""}><img src="/loading-red.gif" alt="loading"/>Continue</button>
                {
                    error ?
                    <div className="error">Something went wrong, please try again.</div> : ""
                }
            </form>
        </StyledForm>
    )

}

export default Form