import 'package:flutter/material.dart';

class ClassroomFinderPage extends StatelessWidget {
  const ClassroomFinderPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Find Classroom')),
      body: const Center(child: Text('Classroom Finder')),
    );
  }
}
