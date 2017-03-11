var Route = use('Route');

Route.get('/', 'User@get');
Route.get('/create', 'User@create');