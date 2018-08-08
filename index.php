<html>
<head>
	<title>Link Checker</title>
	<style>
		body,table td {font-size: 10px;}
		table, button { display: none; }
		table td { border: 1px solid #000; }
		
	</style>
</head>
<body>

	<button id="run_btn">Run</button>
	<button id="reset_btn">Reset</button>
	<button id="clear_btn">Clear</button>

	<div id="links">
		<table>
			<thead>
				<tr>
					<th>URL</th>
					<th>Status</th>
					<th>Redirect URL</th>
					<th>New Status</th>
					<th>New Redirect URL</th>
				</tr>
			</thead>	
			<tbody>
			</tbody>
		</table>
	</div>

	Input Links<br>
	<textarea id="list"></textarea>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="/script.js"></script>
</body>
</html>