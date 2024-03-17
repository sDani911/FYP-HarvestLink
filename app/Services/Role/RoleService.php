<?php

namespace App\Services\Role;

use App\Models\Role;
use App\Services\Permission\PermissionService;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use function PHPUnit\Framework\isEmpty;

class RoleService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "Role";
    }

    public function getSingleRolePermission($role){
    $permissionService = new PermissionService();

    $permissionArray = array();
    if (!empty($role->permission_id) && $role->permission_id[0] !== "") {
        foreach ($role->permission_id as $id) {
            $permissionArray[] = $permissionService->show((int)$id);
        }
    }
    return $permissionArray;
}
    public function getRolePermission($roles)
    {
        foreach ($roles as $role) {
            if (!empty($role->permission_id) && $role->permission_id[0] !== "") {
                $role->permissions = $this->getSingleRolePermission($role);
            }
        }

        return $roles;
    }

    public function roleList($view = null, $page = null,$search = null)
    {
        try{
        $roles = Role::orderBy('name')->select('*')->selectRaw('name as label');
        if(!is_null($search)){
            $roles = $roles->where('name', 'like', '%' .$search. '%' )
                ->orderByRaw('CASE
               WHEN name LIKE "'.$search.'%" THEN 1
               WHEN name LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
        }
        if($view){
            $roles = $roles->paginate($view, ['*'], 'page', $page);
            $roles = $this->getRolePermission($roles);
            return $roles;
        }
        $roles = $roles->get();
        $roles = $this->getRolePermission($roles);

        return $roles;
    } catch (QueryException $e) {
    // Handle the database query exception here, log it or return an error response
    return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
    } catch (\Exception $e) {
        // Handle other exceptions
                return ['error' => config('constants.internal_error')];
    }
    }

    /**
     * Create a Tag
     *
     * @param array $data
     * @return mixed
     */
    public function store($data)
    {
        try{
        $userId = Auth::user()->id;
        if (Role::nameExists($data['name'], $userId)) {
            return [
                'error' => config('constants.name_exist')($this->moduleName),
            ];
        }

        $role = Role::create([
            'name'          => $data['name'],
            'permission_id' => $data['permission_id'],
            'description'   => $data['description'],
            'created_by'    => $userId,
        ]);

        return [
            'message' => config('constants.record_created')($this->moduleName),
            'data' => $role
        ];
    } catch (QueryException $e) {
    // Handle the database query exception here, log it or return an error response
    return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
    } catch (\Exception $e) {
        return ['error' => config('constants.internal_error')];
    }
    }

    /**
     * Get a Tag
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try{
        $userId = Auth::user()->id;
        if (!Role::exists($id, $userId)) {
            return [
                'error' => config('constants.not_found')($this->moduleName),
            ];
        }

        $role = Role::where('id', $id)->first();
        $role->permissions = $this->getSingleRolePermission($role);

        return $role;
        } catch (QueryException $e) {
            // Handle the database query exception here, log it or return an error response
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            // Handle other exceptions
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a Tag for edit
     *
     * @param integer $id
     * @return mixed
     */
    public function getEditData($id)
    {
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

    /**
     * Update a Tag
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try{
        $userId = Auth::user()->id;
            if (!Role::exists($id, $userId)) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

        // update Tag Data.
        $update = [
            'name'          => $data['name'],
            'permission_id' => $data['permission_id'],
            'description'   => $data['description'],
            'user_id'       => $userId,
        ];

        $role = Role::where('id', $id)->where('created_by', $userId)->first();
        $role->update($update);

        return [
            'message' => config('constants.record_updated')($this->moduleName),
            'data' => $role
        ];
    } catch (QueryException $e) {
    // Handle the database query exception here, log it or return an error response
    return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
    } catch (\Exception $e) {
        // Handle other exceptions
        return ['error' => config('constants.internal_error')];
    }
    }

    /**
     * Delete a Tag
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
        $userId = Auth::user()->id;
        $role = Role::where('id', $id)->where('created_by', $userId)->first();
        if (!$role) {
            return [
                'error' => config('constants.not_found')($this->moduleName),
            ];
        }

        $role->delete();
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
