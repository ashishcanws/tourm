// src/pages/admin/Users.jsx
import { useState, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Skeleton, Alert,
  TextField, InputAdornment, Avatar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { supabase } from "../../supabase";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Supabase auth users directly nahi milte frontend se
        // Isliye bookings se unique users nikalenge
        const { data, error } = await supabase
          .from("bookings")
          .select("user_id, first_name, last_name, email, phone, created_at");

        if (error) throw error;

        // Unique users by user_id
        const unique = Object.values(
          data.reduce((acc, b) => {
            if (!acc[b.user_id]) acc[b.user_id] = { ...b, bookingCount: 1 };
            else acc[b.user_id].bookingCount += 1;
            return acc;
          }, {})
        );

        setUsers(unique);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      {/* Header */}
      <Box sx={{mb:3}}>
        <Typography variant="h4" sx={{ color: "#000", fontWeight: "700" }}>
          Users
        </Typography>
        <Typography color="text.secondary" sx={{ color: "#000", fontWeight: "500", fontSize: "18px" }} mt={0.5}>
          {users.length} registered users
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Search */}
      <TextField
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 2, width: 320,  }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}
      >
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid #eee",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#113d48" }}>
                <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                  User
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                  Phone
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                  Total Bookings
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                  Joined Date
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(5)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{
                      py: 6,
                      color: "text.secondary",
                    }}
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((u) => (
                  <TableRow
                    key={u.user_id}
                    hover
                    sx={{
                      "&:hover": {
                        bgcolor: "#f8fbfc",
                      },
                    }}
                  >
                    <TableCell>
                      <Box sx={{display:"flex", alignItems:"center", gap:2}}>
                        <Avatar
                          sx={{
                            bgcolor: "#113d48",
                            width: 40,
                            height: 40,
                            fontSize: 15,
                            fontWeight: 700,
                          }}
                        >
                          {u.first_name?.[0]}
                          {u.last_name?.[0]}
                        </Avatar>

                        <Box>
                          <Typography
                            fontWeight={600}
                            color="#113d48"
                            fontSize={14}
                            sx={{
                              fontSize:"16px",
                              fontWeight:"600"
                            }}
                          >
                            {u.first_name} {u.last_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{fontSize:"16px", fontWeight:"600"}}>{u.email}</TableCell>

                    <TableCell sx={{fontSize:"16px", fontWeight:"600"}}>
                      {u.phone || "—"}
                    </TableCell>

                    <TableCell>
                      <Chip 
                        label={`${u.bookingCount} Booking${u.bookingCount > 1 ? "s" : ""
                          }`}
                        size="small"
                        sx={{
                          bgcolor: "#E9F6F9",
                          color: "#113d48",
                          fontWeight: 600,
                          fontSize:"16px"
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{fontSize:"16px", fontWeight:"600"}}>
                      {new Date(u.created_at).toLocaleDateString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainer>
    </Box>
  );
}