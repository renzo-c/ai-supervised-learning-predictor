import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import features from "./utils/features";
import getPrediction from "./utils/apis";

import imgNeuron from "./assets/neuron.png";
import imgForest from "./assets/forest.png";
import imgTree from "./assets/tree.png";
import imgVector from "./assets/vector.png";

const drawerWidth = 240;

const classifierDictionary = {
  "MultiLayer Perceptron": "multi-layer-perceptron",
  "Random Forest": "rand_forest",
  "Decision Tree": "decision-tree",
  SVM: "svm",
};

const classifiersAccuracy = {
  "MultiLayer Perceptron": "66%",
  "Random Forest": "99%",
  "Decision Tree": "66%",
  SVM: "67%",
};

const classifiersImgPath = {
  "MultiLayer Perceptron": imgNeuron,
  "Random Forest": imgForest,
  "Decision Tree": imgTree,
  SVM: imgVector,
};

export default function PermanentDrawerLeft() {
  const [classifier, setClassifier] = useState("MultiLayer Perceptron");
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(features[0]);

  const feat = request;
  delete feat.FIELD1;
  
  console.log({ feat });
  console.log({ result });
  console.log({ classifier });
  console.log({ request });

  const onSelectClassifier = (cls) => {
    const label = cls.target.innerText;
    setClassifier(label);
  };

  const handleCloseDialog = (value) => {
    setOpen(false);
    setTimeout(() => setResult(null), 500);
  };

  const onChangeRequest = (e) => {
    const { value, name } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const onChangeSelect = (e) => {
    setRequest(e.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Bike Theft Predictor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: "MultiLayer Perceptron", imgPath: imgNeuron },
            { text: "Random Forest", imgPath: imgForest },
            { text: "Decision Tree", imgPath: imgTree },
            { text: "SVM", imgPath: imgVector },
          ].map((e, index) => (
            <ListItem button key={e.text} onClick={onSelectClassifier}>
              <ListItemIcon sx={{ maxWidth: "20px" }}>
                <img alt="classiffier" src={e.imgPath} width="80%" />
              </ListItemIcon>
              <ListItemText primary={e.text} name={e.text} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ paddingTop: "1em" }} />
        <Divider />
        <Box sx={{ paddingTop: "2em" }} />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Test Data</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={request}
            label="Instance Test Data"
            onChange={onChangeSelect}
          >
            {features.map((feature, idx) => (
              <MenuItem key={idx} value={feature}>{`Instance ${
                idx + 1
              }`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Drawer>
      <Box
        component="main"
        sx={{
          width: "80vw",
          bgcolor: "background.default",
          p: 3,
          mt: "2em",
          mx: "2em",
        }}
      >
        <Toolbar />
        <Box>
          <Typography textAlign="center">Classifier in use:</Typography>
          <div
            style={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "1em", maxWidth: "50px" }}>
              <img
                width="100%"
                alt="classifier"
                src={classifiersImgPath[classifier]}
              />
            </div>
            <Typography variant="h3" textAlign="center">
              {classifier}
            </Typography>
          </div>
          <Typography padding="1em" textAlign="center">
            Model Accuracy: {classifiersAccuracy[classifier]}
          </Typography>
        </Box>
        <Box textAlign="center" sx={{ padding: 6 }}>
          <Button
            variant="outlined"
            onClick={() => {
              getPrediction(
                setResult,
                [feat],
                classifierDictionary[classifier]
              );
              setOpen(true);
            }}
          >
            predict
          </Button>
          <Dialog onClose={handleCloseDialog} open={open}>
            <Box style={{ padding: "3em" }}>
              <Typography variant="h4">Prediction</Typography>
              <hr />
              <Box sx={{ paddingTop: "2em" }} />
              <Typography
                variant="h5"
                style={{
                  color: result === "RECOVERED" ? "green" : "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {result ? result : <CircularProgress disableShrink />}
              </Typography>
            </Box>
          </Dialog>
        </Box>
        <Box textAlign="center">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={3}>
              <TextField
                value={request["Primary_Offence"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Primary_Offence"
                name="Primary_Offence"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Occurrence_Year"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Occurrence_Year"
                name="Occurrence_Year"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Occurrence_Month"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Occurrence_Month"
                name="Occurrence_Month"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Occurrence_DayOfWeek"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Occurrence_DayOfWeek"
                name="Occurrence_DayOfWeek"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Occurrence_DayOfMonth"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Occurrence_DayOfMonth"
                name="Occurrence_DayOfMonth"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                value={request["Occurrence_Hour"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Occurrence_Hour"
                name="Occurrence_Hour"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Report_Year"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Report_Year"
                name="Report_Year"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Report_Month"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Report_Month"
                name="Report_Month"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Report_DayOfWeek"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Report_DayOfWeek"
                name="Report_DayOfWeek"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Report_DayOfMonth"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Report_DayOfMonth"
                name="Report_DayOfMonth"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                value={request["Report_Hour"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Report_Hour"
                name="Report_Hour"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Division"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Division"
                name="Division"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Hood_ID"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Hood_ID"
                name="Hood_ID"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["NeighbourhoodName"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="NeighbourhoodName"
                name="NeighbourhoodName"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Location_Type"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Location_Type"
                name="Location_Type"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                value={request["Premises_Type"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Premises_Type"
                name="Premises_Type"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Bike_Make"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Bike_Make"
                name="Bike_Make"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Bike_Type"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Bike_Type"
                name="Bike_Type"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Bike_Speed"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Bike_Speed"
                name="Bike_Speed"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Bike_Colour"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Bike_Colour"
                name="Bike_Colour"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                value={request["Cost_of_Bike"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Cost_of_Bike"
                name="Cost_of_Bike"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Longitude"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Longitude"
                name="Longitude"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["Latitude"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="Latitude"
                name="Latitude"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={request["ro_delta"]}
                id="outlined-basic"
                onChange={(e) => onChangeRequest(e)}
                label="ro_delta"
                name="ro_delta"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
