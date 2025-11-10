class UserModel {
  final String id;
  final String name;

  UserModel({required this.id, required this.name});

  factory UserModel.fromMap(Map<String, dynamic> m) => UserModel(id: m['id'] ?? '', name: m['name'] ?? '');
}
