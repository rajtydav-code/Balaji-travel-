<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bala Ji Travel - Admin Panel</title>

<link rel="stylesheet" href="style.css">

<style>
body{
    font-family:Arial,sans-serif;
    background:#f5f5f5;
    margin:20px;
}

h1{
    text-align:center;
    color:#222;
}

#loginBtn,#logoutBtn{
    padding:10px 20px;
    margin:10px;
    border:none;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
}

#loginBtn{
    background:#4285F4;
    color:white;
}

#logoutBtn{
    background:#e53935;
    color:white;
    display:none;
}

table{
    width:100%;
    border-collapse:collapse;
    background:white;
    margin-top:20px;
}

th,td{
    border:1px solid #ddd;
    padding:10px;
    text-align:center;
}

th{
    background:#FFD700;
}

button{
    padding:6px 12px;
    border:none;
    border-radius:6px;
    cursor:pointer;
}
</style>

</head>
<body>

<h1>🚖 Bala Ji Travel Admin Panel</h1>

<center>

<button id="loginBtn">Login with Google</button>

<button id="logoutBtn">Logout</button>

</center>

<table>

<thead>

<tr>

<th>Name</th>

<th>Mobile</th>

<th>Pickup</th>

<th>Drop</th>

<th>Date</th>

<th>Vehicle</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody id="bookingTable">

</tbody>

</table>

<script type="module" src="admin.js"></script>

</body>
</html>
