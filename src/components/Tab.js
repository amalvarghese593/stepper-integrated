import React, { useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";

function Tab({ data }) {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem
          title="Personal"
          id="personal"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Education"
          id="education"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Professional"
          id="professional"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>

      <div className="TabContent">
        <TabContent id="personal" activeTab={activeTab}>
          <div className="table-responsive">
            <table className="table table-borderd table-striped">
              <tbody>
                <tr>
                  <th>First Name:</th>
                  <td className="text-capitalize">{data.firstName}</td>
                </tr>

                <tr>
                  <th>DOB:</th>
                  <td>{data?.dob?.split("T")[0]}</td>
                </tr>

                <tr>
                  <th>Gender:</th>
                  <td className="text-capitalize">{data.gender}</td>
                </tr>

                <tr>
                  <th>Primary Contact:</th>
                  <td>{data.primaryContactNumber}</td>
                </tr>

                <tr>
                  <th>Primary Email:</th>
                  <td>{data.primaryEmailId}</td>
                </tr>

                <tr>
                  <th>Father's First Name:</th>
                  <td className="text-capitalize">{data.fatherFirstName}</td>
                </tr>

                <tr>
                  <th>Father's Last Name:</th>
                  <td className="text-capitalize">{data.fatherLastName}</td>
                </tr>

                <tr>
                  <th>Mother's First Name:</th>
                  <td className="text-capitalize">{data.motherFirstName}</td>
                </tr>

                <tr>
                  <th>Mother's Last Name:</th>
                  <td className="text-capitalize">{data.motherLastName}</td>
                </tr>

                <tr>
                  <th>Current Location:</th>
                  <td className="text-capitalize">{data.currentLocation}</td>
                </tr>

                <tr>
                  <th>Preferred Location:</th>
                  <td className="text-capitalize">{data.preferredLocation}</td>
                </tr>

                <tr>
                  <th>Current Address:</th>
                  <td className="text-capitalize">{data.currentAddress}</td>
                </tr>

                <tr>
                  <th>Permanent Address: </th>
                  <td className="text-capitalize text-wrap">
                    {data.permanentAddress}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabContent>

        <TabContent id="education" activeTab={activeTab}>
          <div className="table-responsive">
            <table className="table table-borderd table-striped table-responsive">
              <tbody>
                <tr>
                  <th>Graduation:</th>
                  <td>{data.graduation}</td>
                </tr>

                <tr>
                  <th>Graduation Specialisation:</th>
                  <td className="text-capitalize">{data.gradSpecialisation}</td>
                </tr>

                <tr>
                  <th>Graduation YOP:</th>
                  <td>{data.gradYOP}</td>
                </tr>

                <tr>
                  <th>Graduation Percentage:</th>
                  <td>{data.gradPercentage}</td>
                </tr>

                <tr>
                  <th>Graduation University:</th>
                  <td className="text-capitalize">{data.gradUniName}</td>
                </tr>

                <tr>
                  <th>Graduation College Name:</th>
                  <td className="text-capitalize">{data.gradCollegeName}</td>
                </tr>

                <tr>
                  <th>PUC Specialisation:</th>
                  <td className="text-capitalize">{data.pucSpecialisation}</td>
                </tr>

                <tr>
                  <th>PUC YOP:</th>
                  <td>{data.pucYOP}</td>
                </tr>

                <tr>
                  <th>PUC Percentage:</th>
                  <td>{data.pucPercentage}</td>
                </tr>

                <tr>
                  <th>PUC School Name:</th>
                  <td className="text-capitalize">{data.pucSchoolName}</td>
                </tr>

                <tr>
                  <th>Tenth YOP:</th>
                  <td>{data.tenthYOP}</td>
                </tr>

                <tr>
                  <th>Tenth Percentage:</th>
                  <td>{data.tenthPercentage}</td>
                </tr>

                <tr>
                  <th>Tenth University Name:</th>
                  <td className="text-capitalize">{data.tenthUniName}</td>
                </tr>

                <tr>
                  <th>Tenth School Name:</th>
                  <td className="text-capitalize">{data.tenthSchoolName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabContent>

        <TabContent id="professional" activeTab={activeTab}>
          <div className="table-responsive">
            <table className="table table-borderd table-striped table-responsive">
              <tbody>
                <tr>
                  <th>Fresher? :</th>
                  <td className="text-capitalize">{data.isFresher}</td>
                </tr>

                <tr>
                  <th>Current Company Name:</th>
                  <td className="text-capitalize">{data.currentCompanyName}</td>
                </tr>

                <tr>
                  <th>Current Designation:</th>
                  <td className="text-capitalize">{data.currentDesignation}</td>
                </tr>

                <tr>
                  <th>Skills:</th>
                  <td className="text-capitalize">
                    {data?.skills?.map((skill) => (
                      <span class="badge bg-secondary me-2">{skill.skill}</span>
                    ))}
                  </td>
                </tr>

                <tr>
                  <th>Total Experience:</th>
                  <td>{data.totalExperience}</td>
                </tr>

                <tr>
                  <th>Additional Courses:</th>
                  <td className="capital-text">{data.additionalCourses}</td>
                </tr>

                <tr>
                  <th>Summary:</th>
                  <td className="capital-text">{data.summary}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabContent>
      </div>
    </div>
  );
}

export default Tab;
