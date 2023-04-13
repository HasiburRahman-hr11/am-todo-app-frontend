import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Modal,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import AddTodo from "./AddTodo";
import { UserContext } from "../context/user-context/userContext";
import { logoutSuccess } from "../context/user-context/userAction";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "1px solid #ddd",
  boxShadow: 24,
  p: 4,
};

export default function SearchAppBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { dispatch, user } = React.useContext(UserContext);

  const handleLogout = async () => {
    localStorage.removeItem('am-todo-user');
    dispatch(logoutSuccess());
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        width: "100%",
        top: "0",
        left: "0",
        zIndex: "999",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            ToDo List
          </Typography>

          <Button
            onClick={handleOpen}
            variant="outlined"
            sx={{
              marginLeft: "15px",
              backgroundColor: "#fff",
              borderColor: "#fff",
              color: "#0063cc",
              "&:hover": {
                backgroundColor: "#780c8f",
                borderColor: "#780c8f",
                color: "#fff",
              },
            }}
          >
            Add Todo
          </Button>

          {user?.email && (
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{
                marginLeft: "15px",
                backgroundColor: "#E13A2E",
                borderColor: "#E13A2E",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#fff",
                  borderColor: "#fff",
                  color: "#E13A2E",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Modal */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="addTodoModal"
        aria-describedby="addTodoModalDescribe"
      >
        <Box sx={modalStyle}>
          <Typography
            id="addTodoModal"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Add New Todo
          </Typography>
          <AddTodo handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}
