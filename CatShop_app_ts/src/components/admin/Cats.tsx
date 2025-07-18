import React from "react";

const Cats: React.FC = () => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Cats Management</h2>
        <a href="/addcats" className="btn btn-warning">+ Add New Cat</a>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Fluffy</td>
                <td>Persian</td>
                <td>2 years</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Mittens</td>
                <td>Siamese</td>
                <td>3 years</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Shadow</td>
                <td>Maine Coon</td>
                <td>1 year</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cats;
