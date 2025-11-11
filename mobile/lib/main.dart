import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'routes/app_routes.dart';
import 'providers/user_provider.dart';
import 'providers/notification_provider.dart';
import 'providers/classroom_provider.dart';
import 'providers/event_provider.dart';

void main() => runApp(const ClassroomApp());

class ClassroomApp extends StatelessWidget {
  const ClassroomApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider()),
        ChangeNotifierProvider(create: (_) => NotificationProvider()),
        ChangeNotifierProvider(create: (_) => ClassroomProvider()),
        ChangeNotifierProvider(create: (_) => EventProvider()),
      ],
      child: MaterialApp(
        title: 'CampusLink',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          fontFamily: 'Poppins',
          primarySwatch: Colors.blue,
        ),
        initialRoute: '/opening',
        routes: appRoutes,
      ),
    );
  }
}
