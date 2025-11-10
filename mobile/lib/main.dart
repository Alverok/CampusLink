import 'package:flutter/material.dart';
import 'routes/app_routes.dart';

void main() => runApp(const ClassroomApp());

class ClassroomApp extends StatelessWidget {
  const ClassroomApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CampusLink',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Poppins',
        primarySwatch: Colors.blue,
      ),
  initialRoute: '/opening',
      routes: appRoutes,
    );
  }
}
