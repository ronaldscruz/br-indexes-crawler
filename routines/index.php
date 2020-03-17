<?php
  require_once("config.php");
  require_once("logs.php");

  $timeStart = microtime(true);

  logTitle("[UPDATE DATABASE INDEXES]");

  try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch(PDOException $e) {
    logError("Error connecting to database: {$e->getMessage()}");
  }

  function insertLastIndexes($pdo) {
    $indexAPIEndpointAndDBTable = [
      "tr" => "tr",
      "ipcae" => "ipcae",
    ];
  
    $ch = curl_init();
  
    foreach($indexAPIEndpointAndDBTable as $apiEndpoint => $dbTable) {
  
      $requestedUrl = API_URL . "/" . $apiEndpoint;
      
      logTitle("Requesting {$dbTable} from URL: {$requestedUrl}");

      curl_setopt($ch, CURLOPT_URL, $requestedUrl);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      
      $indexesFromApi = curl_exec($ch);

      $indexes = json_decode($indexesFromApi, true);
      $indexesQuantity = empty($indexes) ? 0 : count($indexes);

      logProcess("Got {$indexesQuantity} {$dbTable} from API");

      if(empty($indexes)) continue;      

      $pdo->beginTransaction();

      try {
        $indexesToDb = [];

        foreach($indexes as $index) {
          array_push($indexesToDb, "( '{$index['date']}', {$index['value']} )" );
        }

        if(empty($indexesToDb)) continue;

        $indexesToDb = implode(", ", $indexesToDb);

        $sql = "TRUNCATE TABLE {$dbTable}";
        logProcess("Truncating {$dbTable}");
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $sql = "INSERT INTO {$dbTable} VALUES {$indexesToDb}";
        logProcess("Inserting indexes into {$dbTable}...");
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $pdo->commit();

        logProcess("" . strtoupper($apiEndpoint) . " rows inserted: {$stmt->rowCount()}");
      } catch(PDOException $e) {
        logError("Error inserting into {$dbTable}: {$e->getMessage()}");
        $pdo->rollBack();
      }
    }
  
    curl_close($ch);
  }

  insertLastIndexes($pdo);
  
  $pdo = null;

  $timeEnd = microtime(true);

  $totalTime = $timeEnd - $timeStart;

  logTitle("Indexes updated successfully, took: {$totalTime}s", true);
?>le