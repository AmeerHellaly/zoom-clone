import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from "@elastic/eui";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import useToast from "../hooks/useToast";
import { firebaseDB } from "../utils/FirebaseConfig";
import { FieldErrorType, MeetingType, UserType } from "../utils/Types";
import CreateMeetingButtons from "./FormComponents/CreateMeetingButtons";
import MeetingDateField from "./FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "./FormComponents/MeetingMaximumUserField";
import MeetingNameField from "./FormComponents/MeetingNameField";
import MeetingUserField from "./FormComponents/MeetingUsersField";
import useAuth from "../hooks/useAuth";

export default function EditFlyout({
  closeFlyout,
  meetings,
}: {
  closeFlyout: any;
  meetings: MeetingType;
}) {
  useAuth()
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const [meetingName, setMeetingName] = useState(meetings.meetingName);
  const [meetingType] = useState(meetings.meetingType);
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment(meetings.meetingDate));
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState(false);
  const [validate, setvalidate] = useState(true);
  
  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };

  useEffect(() => {
    if (users) {
      const foundUsers: Array<UserType> = [];
      meetings.invitedUsers.forEach((user: string) => {
        const findUser = users.find(
          (tempUser: UserType) => tempUser.uid === user
        );
        if (findUser) foundUsers.push(findUser);
      });
      setSelectedUser(foundUsers);
    }
  }, [meetings, users]);

  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

 
  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } 
    else if(meetingName.length<3  ){
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please enter more than 3 characters"];
      errors=true
    }
    else if(meetingName.length>15  ){
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please enter less than 15 characters"];
      errors=true
    }
    else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const editMeeting = async () => {
    if (!validateForm()) {
      const editedMeeting = {
        ...meetings,
        meetingName,
        meetingType,
        invitedUsers: selectedUser.map((user: UserType) => user.uid),
        maxUsers: size,
        meetingDate: startDate.format("L"),
        status: !status,
      };
      delete editedMeeting.docId;
      const docRef = doc(firebaseDB, "meetings", meetings.docId!);
      await updateDoc(docRef, editedMeeting);
      createToast({ title: "Meeting updated successfully.", type: "success" });
      closeFlyout(true);
     createToast({
      title:"One on One Meeting Created Successfully",
      type:'success'
     })
      
    }
  };
 

  return (
    <EuiFlyout ownFocus onClose={() => closeFlyout()}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{meetings.meetingName}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm>
          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMettingnName={setMeetingName}
          />
          {meetingType === "anyone-can-join" ? (
            <MeetingMaximumUsersField value={size} setValue={setSize} />
          ) : (
            <MeetingUserField
              label="Invite Users"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUser}
              singleSelection={
                meetingType === "1-on-1" ? { asPlainText: true } : false
              }
              isClearable={false}
              placeholder="Select a Users"
            />
          )}
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
            <EuiSwitch
              showLabel={false}
              label="Cancel Meeting"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </EuiFormRow>
          <EuiSpacer />
          <CreateMeetingButtons
            createMeeting={editMeeting}
            isEdit
            closeFlyout={closeFlyout}
          />
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
}
