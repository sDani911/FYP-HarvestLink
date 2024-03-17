<?php

return[
    'internal_error' => ['status_code' => 500, 'message' => 'Internal Server Error'],
    'name_exist' => function ($moduleName) {
        return ['status_code' => 403, 'message' => $moduleName. ' name already exists'];
    },
    'not_found' => function ($moduleName) {
        return ['status_code' => 404, 'message' => $moduleName. ' ID not found.'];
    },
    'record_created' => function ($moduleName) {
        return ['status_code' => 200, 'message' => $moduleName. ' created successfully.'];
    },
    'record_updated' => function ($moduleName) {
        return ['status_code' => 200, 'message' => $moduleName. ' updated successfully.'];
    },
    'record_deleted' => function ($moduleName) {
        return ['status_code' => 200, 'message' => $moduleName. ' deleted successfully.'];
    },
    'active' => function ($moduleName) {
        return ['status_code' => 200, 'message' => $moduleName. ' active successfully.'];
    },
    'in_active' => function ($moduleName) {
        return ['status_code' => 200, 'message' => $moduleName. ' in active successfully.'];
    },
    'already_marked' => function ($moduleName, $status) {
        return ['status_code' => 422, 'message' => $moduleName. ' already mark as ' . $status.'.'];
    },
    'marked_as' => function ($moduleName, $status) {
        return ['status_code' => 200, 'message' => $moduleName. ' mark as ' . $status.' successfully.'];
    },
    'cannot_mark' => function ($moduleName, $status) {
        return ['status_code' => 200, 'message' => $moduleName. ' can not be mark as ' . $status.'.'];
    },
    'query_error' => function ($moduleName, $message) {
        return ['status_code' => 501, 'message' => $message];
    },
];
