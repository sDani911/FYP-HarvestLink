<?php

namespace App\Services\Permission;

use App\Models\Permission;
use Illuminate\Database\QueryException;
class PermissionService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "Permission";
    }
    public function permissionList($view = null, $page = null, $search = null, $groupBy = null)
    {
        try {
            // Initialize a query to retrieve permissions from the database and order them by name
            $permissions = Permission::orderBy('name')->select('*')->selectRaw('name as label');

            // If a search term is provided, filter the permissions based on the search term
            if ($search) {
                $permissions = $permissions->where('name', 'like', '%' . $search . '%')
                    ->orderByRaw('CASE
                    WHEN name LIKE "' . $search . '%" THEN 1
                    WHEN name LIKE "%' . $search . '%" THEN 2
                    ELSE 3
                END');
            }

            // If a $view parameter is provided, paginate the results and return the paginated collection
            if ($view) {
                $permissions = $permissions->paginate($view, ['*'], 'page', $page);
                return $permissions;
            }

            // If no $view parameter is provided, retrieve all permissions and return the collection
            $permissions = $permissions->get();
            if ($groupBy){
                $permissions = collect($permissions)->groupBy('category');
            }
            return $permissions;
        } catch (QueryException $e) {
            // Handle the database query exception here, log it or return an error response
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            // Handle other exceptions
            return ['error' => config('constants.internal_error')];
        }
    }

    public function store($data){
        try{
        if (Permission::where('name',$data['name'])->first()) {
            return [
                'error' => config('constants.name_exist')($this->moduleName),
            ];
        }

        $permission = Permission::create([
            'name'          => $data['name'],
            'description'   => $data['description'],
            'category'      => $data['category'],
        ]);
        return [
            'message' => config('constants.record_created')($this->moduleName),
            'data' => $permission
        ];
    } catch (QueryException $e) {
    // Handle the database query exception here, log it or return an error response
return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
} catch (\Exception $e) {
    return ['error' => config('constants.internal_error')];
}
    }
    public function show($id){
        try{
        if (!Permission::find($id)) {
            return [
                'error' => config('constants.not_found')($this->moduleName),
            ];
        }

        $permission = Permission::where('id', $id)->first();

        return $permission;
        } catch (QueryException $e) {
            // Handle the database query exception here, log it or return an error response
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            // Handle other exceptions
            return ['error' => config('constants.internal_error')];
        }
    }

    public function getEditData($id){
        try {
            return $this->show($id);
        } catch (QueryException $e) {
            // Handle the database query exception here, log it or return an error response
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            // Handle other exceptions
            return ['error' => config('constants.internal_error')];
        }
    }

    public function update($data, $id)
    {
        try{
        if (!Permission::find($id)) {
            return [
                'error' => config('constants.not_found')($this->moduleName),
            ];
        }

        // update Tag Data.
        $update = [
            'name'          => $data['name'],
            'description'   => $data['description'],
            'category'      => $data['category'],
        ];

        $permission = Permission::where('id', $id)->first();
        $permission->update($update);

            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $permission
            ];
        } catch (QueryException $e) {
            // Handle the database query exception here, log it or return an error response
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            // Handle other exceptions
            return ['error' => config('constants.internal_error')];
        }
    }

    public function destroy($id)
    {
        try{
        $permission = Permission::where('id', $id)->first();
        if (!$permission) {
            return [
                'error' => config('constants.not_found')($this->moduleName),
            ];
        }

        $permission->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            // Handle the database query exception here, log it or return an error response
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            // Handle other exceptions
            return ['error' => config('constants.internal_error')];
        }
    }
}
