<?php

namespace Methods\Entities;

/**
 * base class for any api method
 */
abstract class BaseApiMethod
{
    /** @var bool is debug mode */
    protected const DEBUG = true;
    /** @var string api method (POST/GET) */
    protected const METHOD = '';
    /** @var array required not empty fields, like id of obj */
    protected const REQUIRED_FIELDS = [];

    /** @var mixed */
    private $POST;
    private array $GET;

    public function __construct()
    {
        if (self::DEBUG) {
            ini_set('display_errors', '1');
            ini_set('display_startup_errors', '1');
            error_reporting(E_ALL);
        }

        $this->POST = json_decode(file_get_contents('php://input'), true) ?? [];
        $this->GET = $_GET;
        $this->checkRequiredConsts();
        $this->checkRequiredFields();
    }

    /** set default headers */
    protected function setHeaders()
    {
        header('Content-Type: application/json; charset=utf-8');
    }

    /**
     * @param $key
     *
     * @return mixed|null
     */
    protected function getFromPost($key)
    {
        if (!empty($this->POST[$key])) {
            return $this->POST[$key];
        }
        return null;
    }

    /**
     * @param $key
     *
     * @return mixed|null
     */
    protected function getFromGet($key) {
        if (!empty($this->GET[$key])) {
            return $this->GET[$key];
        }
        return null;
    }

    /** check that all required fields are exists  */
    protected function checkRequiredFields()
    {
        $method = static::METHOD;
        $fields = static::REQUIRED_FIELDS;
        foreach ($this->$method as $key => $value) {
            if ($value) {
                $fieldIdx = array_search($key, $fields);
                unset($fields[$fieldIdx]);
            }
        }

        if (!empty($fields)) {
            $this->answerError('Fields are requred: ' . implode(', ', $fields));
            die();
        }
    }

    /** check that all consts overrides */
    protected function checkRequiredConsts()
    {
        foreach ([static::REQUIRED_FIELDS, static::METHOD] as $const) {
            if (empty($const)) {
                throw new \Exception("Not all constants are set");
            }
        }
    }

    /**
     * answer to request
     *
     * @param $obj
     *
     * @return void
     */
    protected function answer($obj) {
        $this->setHeaders();
        if (!$obj && !is_array($obj)) {
            throw new \Exception("Empty answer");
        }

        echo json_encode($obj);
    }

    /** send error response */
    protected function answerError($msg) {
        //http_response_code(400);
        $this->answer(['error' => $msg]);
    }

    /** default action for api method */
    public abstract function actionDefault();
}