"use client";
import { useState } from "react";

import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

import styles from "./page.module.css";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (e: any) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const requestBody = {
      prompt: prompt,
    };

    fetch(process.env.BACKEND_URL + ":4000/google-gen-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.result))
      .catch((error) => {
        console.error("Error querying API: ", error);
        alert("Sorry, there was an issue with your request. Please try again.");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}
      >
        <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
          Talk to the AI
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={prompt}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ChatIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Ask me anything..."
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </Box>
        </form>

        {response && (
          <>
            <Divider sx={{ margin: "2rem 0" }} />
            <Typography>{response}</Typography>
          </>
        )}
      </Paper>
    </Box>
  );
}
