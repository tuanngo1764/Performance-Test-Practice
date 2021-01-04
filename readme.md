# [PT] Performance Test Practice
> Implement test script follow Scenario to test sites performance.

![](header.png)

## Overview

Performance testing ensures that software applications operate efficiently for the expected working time. 

In which the focus of performance testing includes response time, scalability, stability.

## Setting

* Apache JMETER.

_For more details and usage, please refer to the [jmeter.apache.org][jmeter.apache.org]._

* Java SE Development Kit.

_For more details and usage, please refer to the [oracle.com][oracle.com]._

* Install Java and Configure an environment variable for Java.

_For more details and usage, please refer to the [java-environment-setting][java-environment-setting]._

## Generating HTML report:

* Generation after load test:

```sh
jmeter -n -t <test JMX file> -l <test log file> -e -o <Path to output folder>
```

* Generation from an existing sample CSV log file:

```sh
jmeter -g <log file> -o <Path to output folder>
```

## Demo

<!-- Markdown link & img dfn's -->
[natural-language-processing]: https://en.wikipedia.org/wiki/Natural_language_processing
[supervised-learning]: https://www.educative.io/edpresso/supervised-and-unsupervised-learning?aid=5082902844932096&utm_source=google&utm_medium=cpc&utm_campaign=edpresso-dynamic&gclid=Cj0KCQiA88X_BRDUARIsACVMYD80ZW-vRrBMQdQXtYzwcLVSO9iYgnCCXrQvvICOvMPtbO-gUIl7ZkQaAkD2EALw_wcB
[support-vector-machine]: https://en.wikipedia.org/wiki/Support-vector_machine
[logistic-regression]: https://en.wikipedia.org/wiki/Logistic_regression
[naive-bayes-classifier]: https://en.wikipedia.org/wiki/Naive_Bayes_classifier
[java-environment-setting]: https://devwithus.com/install-java-windows-10/
[jmeter.apache.org]: https://jmeter.apache.org/download_jmeter.cgi
[oracle.com]: https://www.oracle.com/java/technologies/javase-jdk15-downloads.html