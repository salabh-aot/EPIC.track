import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { ETFormLabel } from "../../shared";
import ControlledSelectV2 from "../../shared/controlledInputComponents/ControlledSelectV2";
import { Staff, StaffWorkRole } from "../../../models/staff";
import { ListType } from "../../../models/code";
import { showNotification } from "../../shared/notificationProvider";
import { COMMON_ERROR_MESSAGE } from "../../../constants/application-constant";
import staffService from "../../../services/staffService/staffService";
import { sort } from "../../../utils";
import codeService from "../../../services/codeService";
import workService from "../../../services/workService/workService";
import ControlledSwitch from "../../shared/controlledInputComponents/ControlledSwitch";
import { WorkplanContext } from "../WorkPlanContext";
import { getAxiosError } from "../../../utils/axiosUtils";

interface TeamFormProps {
  workStaffId?: number;
  onSave: () => void;
}

const schema = yup.object().shape({
  role_id: yup.number().required("Please select the role"),
  staff_id: yup
    .number()
    .required("Please select the staff")
    .test({
      name: "checkDuplicateStaffWorkAssociation",
      exclusive: true,
      message: "Selected Staff-Work Association already exists",
      test: async (value, { parent }) => {
        if (value) {
          const validateWorkStaff = await workService.checkWorkStaffExists(
            parent["work_id"],
            value,
            parent["role_id"],
            parent["id"]
          );
          return !(validateWorkStaff.data as any)["exists"] as boolean;
        }
        return true;
      },
    }),
});

const TeamForm = ({ onSave, workStaffId }: TeamFormProps) => {
  const [staffWorkRole, setStaffWorkRole] = React.useState<StaffWorkRole>();
  const [staff, setStaff] = React.useState<Staff[]>([]);
  const [roles, setRoles] = React.useState<ListType[]>([]);
  const emailRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const ctx = React.useContext(WorkplanContext);

  React.useEffect(() => {
    getAllStaff();
    getAllRoles();
  }, []);

  React.useEffect(() => {
    reset({
      ...staffWorkRole,
      work_id: ctx.work?.id,
      is_active: true,
    });
  }, [ctx.work?.id]);

  React.useEffect(() => {
    if (workStaffId) {
      getTeamMember();
    }
  }, [workStaffId]);

  React.useEffect(() => {
    if (staffWorkRole) {
      reset(staffWorkRole);
    }
  }, [staffWorkRole]);

  const getTeamMember = async () => {
    try {
      const result = await workService.getWorkTeamMember(Number(workStaffId));
      if (result.status === 200) {
        const staff = result.data as StaffWorkRole;
        setStaffWorkRole(staff);
      }
    } catch (e) {
      showNotification(COMMON_ERROR_MESSAGE, {
        type: "error",
      });
    }
  };

  const getAllStaff = async () => {
    try {
      const result = await staffService.getAll();
      if (result.status === 200) {
        const staff = result.data as Staff[];
        setStaff(sort(staff, "full_name"));
      }
    } catch (e) {
      showNotification(COMMON_ERROR_MESSAGE, {
        type: "error",
      });
    }
  };

  const getAllRoles = async () => {
    try {
      const result = await codeService.getCodes("roles");
      if (result.status === 200) {
        const roles = (result.data as any)["codes"] as ListType[];
        setRoles(sort(roles, "name"));
      }
    } catch (e) {
      showNotification(COMMON_ERROR_MESSAGE, {
        type: "error",
      });
    }
  };
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: staffWorkRole,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = methods;

  const onSubmitHandler = async (data: StaffWorkRole) => {
    try {
      if (workStaffId) {
        const createResult = await workService.updateWorkStaff(
          data,
          Number(workStaffId)
        );
        if (createResult.status === 200) {
          showNotification("Milestone details updated", {
            type: "success",
          });
          if (onSave) {
            onSave();
          }
        }
      } else {
        const createResult = await workService.createWorkStaff(
          data,
          Number(ctx.work?.id)
        );
        if (createResult.status === 201) {
          showNotification("Milestone details inserted", {
            type: "success",
          });
          if (onSave) {
            onSave();
          }
        }
      }
    } catch (e: any) {
      const error = getAxiosError(e);
      const message =
        error?.response?.status === 422
          ? error.response.data?.toString()
          : COMMON_ERROR_MESSAGE;
      showNotification(message, {
        type: "error",
      });
    }
  };

  const onStaffChangeHandler = (staffId: number) => {
    const selectedStaff = staff.filter((p) => p.id === Number(staffId))[0];
    (emailRef?.current as any)["value"] = selectedStaff
      ? selectedStaff.email
      : "";
    (phoneRef?.current as any)["value"] = selectedStaff
      ? selectedStaff.phone
      : "";
  };
  console.log(staffWorkRole);
  return (
    <FormProvider {...methods}>
      <Grid
        component={"form"}
        id="team-form"
        spacing={2}
        container
        sx={{
          margin: 0,
          width: "100%",
        }}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Grid item xs={12}>
          <ETFormLabel required>Name</ETFormLabel>
          <ControlledSelectV2
            helperText={errors?.staff_id?.message?.toString()}
            defaultValue={staffWorkRole?.staff_id}
            options={staff || []}
            disabled={!!workStaffId}
            getOptionValue={(o: Staff) => o?.id?.toString()}
            getOptionLabel={(o: Staff) => o?.full_name}
            {...register("staff_id")}
            onHandleChange={(staffId: number) => onStaffChangeHandler(staffId)}
          ></ControlledSelectV2>
        </Grid>
        <Grid item xs={6}>
          <ETFormLabel>Email</ETFormLabel>
          <TextField
            fullWidth
            disabled
            placeholder="Email"
            inputRef={emailRef}
            {...register("staff.email")}
            defaultValue={staffWorkRole?.staff?.email}
          />
        </Grid>
        <Grid item xs={6}>
          <ETFormLabel>Phone</ETFormLabel>
          <TextField
            fullWidth
            disabled
            placeholder="Phone"
            inputRef={phoneRef}
            {...register("staff.phone")}
            defaultValue={staffWorkRole?.staff?.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <ETFormLabel required>Role</ETFormLabel>
          <ControlledSelectV2
            helperText={errors?.role_id?.message?.toString()}
            defaultValue={staffWorkRole?.role_id}
            options={roles || []}
            getOptionValue={(o: ListType) => o?.id?.toString()}
            getOptionLabel={(o: ListType) => o.name}
            {...register("role_id")}
          ></ControlledSelectV2>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <ControlledSwitch
                {...register("is_active")}
                defaultChecked={staffWorkRole?.is_active}
              />
            }
            label="Active"
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default TeamForm;