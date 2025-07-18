import React from 'react'

const Dashboard: React.FC = () => {

  return (
    <div className="flex-grow-1 p-4">
      <div className="container-fluid">
        <h2>Main Content</h2>
       
        <p>This is the main content area. The sidebar can be collapsed/expanded using the hamburger menu.</p>
        <div className="card bg-white p-4 ">
          <p className="card-text">
            This demonstrates how the sidebar works with the main content area.
            The sidebar uses Bootstrap classes for responsive design.
          </p>
        </div>
      </div>

    </div>

  )
}

export default Dashboard