<?php
  function getLogString($msg, $isTitle = false, $isError = false) {
    $currentTime = date('m/d/Y h:i:s', time());
    $logTime = date('Ymd', time());
  
    $printedLog = "";
    $errorPrefix = $isError ? "[ERROR] " : "";
    $titlePrefix = $isTitle ? "\n----------------------------\n\n" : "";
  
    if($isTitle) {
      $printedLog = "{$titlePrefix}{$errorPrefix}{$msg}\n";
    } else {
      $printedLog = "[{$currentTime}] {$errorPrefix}{$msg}\n";
    }

    $fd = fopen("./logs/log_{$logTime}.log", 'a');
    fwrite($fd, $printedLog);
    fclose($fd);

    return $printedLog;
  }

  function logProcess($msg) {
    print getLogString($msg);
  }

  function logTitle($msg) {
    print getLogString($msg, true);
  }

  function logError($msg) {
    print getLogString($msg, false, true);
  }
?>