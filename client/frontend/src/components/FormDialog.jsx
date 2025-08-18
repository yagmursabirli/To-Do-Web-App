import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

//takvim
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//adaptee
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//adapter, localizationProvider'a verilir adapte olması için
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TaskList from "./TaskList";

//status and priority options
const STATUS_OPTIONS = ["pending", "in_progress", "completed"];
const PRIORITY_OPTIONS = ["low", "medium", "high"];

//validation schema: conditions that we check -- yup
const validationSchema = Yup.object({
  title: Yup.string()
    .min(2)
    .required("Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: Yup.string()
    .min(2)
    .required("Description is required")
    .max(300, "Description cannot exceed 300 characters"),
  dueDate: Yup.date()
    .nullable()
    .min(new Date(Date.now() - 86400000), "Date must be today or in the future")
    .required("Due date is required."),
});

function FormDialog({ tasks, open, onClose, onSave, isEditing, onChange }) {
  //form validation
  const formik = useFormik({
    initialValues: {
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      priority: tasks.priority,
      dueDate: tasks.dueDate,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open, formik]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditing ? "Edit Task" : "New Task"}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          {/* title and description */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginY: 3,
            }}
          >
            <TextField
              name="title"
              id="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              name="description"
              id="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              multiline
              minRows={1}
              maxRows={8}
              fullWidth
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`${formik.values.description.length}/300`}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* status, priority and due date */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
              gap: 2,
              alignItems: "start",
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                label="status"
                value={tasks.status}
                onChange={onChange}
              >
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status
                      .replace("_", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                label="priority"
                value={tasks.priority}
                onChange={onChange}
              >
                {PRIORITY_OPTIONS.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                value={formik.values.dueDate}
                onChange={(date) => formik.setFieldValue("dueDate", date)}
                slotProps={{
                  textField: {
                    error:
                      formik.touched.dueDate && Boolean(formik.errors.dueDate),
                    helperText: formik.touched.dueDate && formik.errors.dueDate,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </form>
      </DialogContent>

      {/* cancel ve save butonları */}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={formik.handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
